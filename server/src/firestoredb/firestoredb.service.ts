import { Injectable } from '@nestjs/common';
import { FirestoreAdminService } from '../firestore-admin/firestore-admin.service';

@Injectable()
export class FirestoredbService {
  firestore = this.firestoreAdminService.getFirestore();
  constructor(private readonly firestoreAdminService: FirestoreAdminService) {}

  // check if user exists
  async checkUser(id: string) {
    const firestore = this.firestoreAdminService.getFirestore();
    // console.log('Checking user with ID:', id);

    const documentRef = firestore.collection('users').doc(id);

    try {
      const docSnapshot = await documentRef.get();
      console.log('doc ', docSnapshot.exists);
      const exists = docSnapshot.exists;
      if (exists) {
        // console.log('user exists');
        return true;
      } else {
        // console.log('user doesnt exist');
        return false;
      }
    } catch (error) {
      console.error('Error checking document:', error);
      return false;
    }
  }
  // add user
  async addUser(user: any) {
    try {
      const usersCollection = this.firestore.collection('users');
      await usersCollection.doc(`${user.id}`).set(user);
      console.log('User added');
    } catch (error) {
      console.error('Error adding user to Firestore:', error);
    }
  }

  //update user
  async updateUser(user: any) {
    const userRef = this.firestore.collection('users').doc(user.userId);

    try {
      await userRef.update({
        city: user.newCity,
      });
      console.log('User updated');
      return true; // Successful update
    } catch (error) {
      console.error('Error updating city:', error);
      return false;
    }
  }

  //delete user
  async deleteUser(id: string) {
    try {
      const usersCollection = this.firestore.collection('users');
      await usersCollection.doc(`${id}`).delete();
      console.log('User deleted');
      return true;
    } catch (error) {
      console.error('Error deleting user :', error);
      return false;
    }
  }

  //get users
  async getUsers() {
    const usersCollection = this.firestore.collection('users');

    try {
      const querySnapshot = await usersCollection.get();
      const users = [];

      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      //   console.log(users);
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }
}
