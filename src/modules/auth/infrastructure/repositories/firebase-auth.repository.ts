import { auth, firestore } from '../../../../shared/config/firebase.js';
import type { IAuthRepository } from '../../domain/interfaces/auth.repository.interface.js';
import type { IAuthUser } from '../../domain/entities/auth-user.entity.js';
import type { IRegisterUserDto } from '../../application/dtos/register-user.dto.js';

export class FirebaseAuthRepository implements IAuthRepository {
  async createUser(data: IRegisterUserDto): Promise<IAuthUser> {
    const now = new Date().toISOString();

    const userRecord = await auth.createUser({
      email: data.email,
      password: data.password,
      displayName: data.name,
    });

    await auth.setCustomUserClaims(userRecord.uid, {
      role: data.role,
      companyId: data.companyId,
    });

    const authUser: IAuthUser = {
      uid: userRecord.uid,
      name: data.name,
      email: data.email,
      role: data.role,
      companyId: data.companyId,
      active: true,
      createdAt: now,
      updatedAt: now,
    };

    await firestore
      .collection('companies')
      .doc(data.companyId)
      .collection('users')
      .doc(userRecord.uid)
      .set({
        ...authUser,
      });

    return authUser;
  }

  async findByUid(uid: string): Promise<IAuthUser | null> {
    const companySnapshot = await firestore
      .collectionGroup('users')
      .where('uid', '==', uid)
      .limit(1)
      .get();

    if (companySnapshot.empty) {
      return null;
    }

    return companySnapshot.docs[0].data() as IAuthUser;
  }

  async findByEmail(email: string): Promise<IAuthUser | null> {
    const companySnapshot = await firestore
      .collectionGroup('users')
      .where('email', '==', email)
      .limit(1)
      .get();

    if (companySnapshot.empty) {
      return null;
    }

    return companySnapshot.docs[0].data() as IAuthUser;
  }
}
