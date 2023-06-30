const User = require('../model/model');

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({
      username: username,
      password: password,
      email: email,
    });

    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to register user' });
  }
};

// User login
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username: username, password: password });

    if (!user) {
      return res.status(404).json({ error: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login user' });
  }
};


// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'username email');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};


//GetUserByID

exports.getUserById = async (req,res)=>{
try {
  const {id} = req.params;
  const user= await User.findById(id);

  if(!user)
  {
    res.status(404).json({message:'User Not FOund'});
  }

  res.status(200).json(user);
} catch (error) {
   res.status(500).json({message:'Failed To Fecth data'});
}
}


// Delete user by ID
exports.deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
};


//Update User BY ID

// Update a user by ID
exports.updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, password } = req.body;

    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user fields
    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;

    // Save the updated user
    const updatedUser = await user.save();

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
};




