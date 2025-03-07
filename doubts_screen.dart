import 'package:flutter/material.dart';

class DoubtsScreen extends StatelessWidget {
  const DoubtsScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Doubts & Queries')),
      body: const Center(
        child: Text(
          'Ask your coding doubts here!',
          style: TextStyle(fontSize: 18),
        ),
      ),
    );
  }
}
