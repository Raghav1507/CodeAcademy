import 'package:flutter/material.dart';

class User {
  final String email;
  final String name;

  User({required this.email, required this.name});
}

class AuthService extends ChangeNotifier {
  User? _currentUser;
  bool _isLoading = false;

  User? get currentUser => _currentUser;
  bool get isLoading => _isLoading;
  bool get isAuthenticated => _currentUser != null;

  Future<void> signIn(String email, String password) async {
    try {
      _isLoading = true;
      notifyListeners();

      // Simulate network delay
      await Future.delayed(const Duration(seconds: 1));

      // For demo purposes, accept any email/password
      _currentUser = User(
        email: email,
        name: email.split('@')[0],
      );
      
      notifyListeners();
    } catch (e) {
      rethrow;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> signUp(String email, String password, String name) async {
    try {
      _isLoading = true;
      notifyListeners();

      // Simulate network delay
      await Future.delayed(const Duration(seconds: 1));

      // For demo purposes, accept any email/password
      _currentUser = User(
        email: email,
        name: name,
      );
      
      notifyListeners();
    } catch (e) {
      rethrow;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<void> signOut() async {
    try {
      _isLoading = true;
      notifyListeners();

      // Simulate network delay
      await Future.delayed(const Duration(seconds: 1));

      _currentUser = null;
      notifyListeners();
    } catch (e) {
      rethrow;
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  // Reset password
  Future<void> resetPassword(String email) async {
    try {
      // Simulate network delay
      await Future.delayed(const Duration(seconds: 1));
      
      // In a real app, you would send a password reset email
      print('Password reset email sent to $email');
    } catch (e) {
      throw 'An error occurred. Please try again.';
    }
  }
} 