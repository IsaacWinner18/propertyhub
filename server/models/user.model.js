import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Login method enum
const LOGIN_METHODS = {
  LOCAL: 'local',
  GOOGLE: 'google',
  FACEBOOK: 'facebook'
};

// User roles enum
const USER_ROLES = {
  USER: 'user',
  AGENT: 'agent',
  ADMIN: 'admin',
  SUPER_ADMIN: 'super_admin'
};

// User schema for both login and signup
const userSchema = new mongoose.Schema({
  // Signup fields
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: function() {
      return this.signupMethod === LOGIN_METHODS.LOCAL;
    },
    minlength: 6
  },
  signupMethod: {
    type: String,
    enum: Object.values(LOGIN_METHODS),
    required: true,
    default: LOGIN_METHODS.LOCAL
  },
  
  // User role
  role: {
    type: String,
    enum: Object.values(USER_ROLES),
    required: true,
    default: USER_ROLES.USER
  },
  
  // Login tracking fields
  loginMethod: {
    type: String,
    enum: Object.values(LOGIN_METHODS),
    default: LOGIN_METHODS.LOCAL
  },
  lastLoggedIn: {
    type: Date,
    default: Date.now
  },
  
  // Additional fields for OAuth
  googleId: {
    type: String,
    sparse: true
  },
  facebookId: {
    type: String,
    sparse: true
  },
  
  // Account status
  isActive: {
    type: Boolean,
    default: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ googleId: 1 });
userSchema.index({ facebookId: 1 });

// Hash password before saving
userSchema.pre('save', async function(next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  
  // Only hash if signup method is local
  if (this.signupMethod === LOGIN_METHODS.LOCAL && this.password) {
    try {
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (error) {
      return next(error);
    }
  }
  
  next();
});

// Method to compare password for login
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

// Method to update last logged in
userSchema.methods.updateLastLogin = function(loginMethod = LOGIN_METHODS.LOCAL) {
  this.lastLoggedIn = new Date();
  this.loginMethod = loginMethod;
  return this.save();
};

// Static method to find user by email
userSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

// Static method to find user by OAuth ID
userSchema.statics.findByOAuthId = function(provider, id) {
  const query = {};
  if (provider === LOGIN_METHODS.GOOGLE) {
    query.googleId = id;
  } else if (provider === LOGIN_METHODS.FACEBOOK) {
    query.facebookId = id;
  }
  return this.findOne(query);
};

// Method to check if user has specific role
userSchema.methods.hasRole = function(role) {
  return this.role === role;
};

// Method to check if user has admin privileges
userSchema.methods.isAdmin = function() {
  return this.role === USER_ROLES.ADMIN || this.role === USER_ROLES.SUPER_ADMIN;
};

// Method to check if user is agent or higher
userSchema.methods.isAgent = function() {
  return this.role === USER_ROLES.AGENT || this.isAdmin();
};

// Remove password from JSON output
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

const User = mongoose.model('User', userSchema);

export default User;
export { LOGIN_METHODS, USER_ROLES };
