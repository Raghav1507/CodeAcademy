import 'package:flutter/material.dart';

class FreelanceScreen extends StatelessWidget {
  const FreelanceScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Freelance')),
      body: const Center(
        child: Text(
          'Find and post freelance coding jobs here!',
          style: TextStyle(fontSize: 18),
        ),
      ),
    );
  }
}
