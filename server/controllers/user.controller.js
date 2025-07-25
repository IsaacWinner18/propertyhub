import User, { LOGIN_METHODS, USER_ROLES } from "../models/user.model.js";
import { 
  generateTokens, 
  generateAccessToken, 
  verifyRefreshToken 
} from "../middleware/auth.middleware.js";
import { config } from "dotenv";
config();

// Signup Controller
export const signup = async (req, res) => {
  try {
    const { fullName, email, password, signupMethod = LOGIN_METHODS.LOCAL } = req.body;

    // Validation
    if (!fullName || !email) {
      return res.status(400).json({
        success: false,
        message: "Full name and email are required"
      });
    }

    if (signupMethod === LOGIN_METHODS.LOCAL && !password) {
      return res.status(400).json({
        success: false,
        message: "Password is required for local signup"
      });
    }

    if (password && password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long"
      });
    }

    // Check if user already exists
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with this email already exists"
      });
    }

    // Create new user
    const userData = {
      fullName: fullName.trim(),
      email: email.toLowerCase().trim(),
      signupMethod,
      loginMethod: signupMethod
    };

    if (signupMethod === LOGIN_METHODS.LOCAL) {
      userData.password = password;
    }

    const user = new User(userData);
    await user.save();

    // Generate tokens with user role
    const tokens = generateTokens(user._id, user.role);

    // Update last login
    await user.updateLastLogin(signupMethod);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          signupMethod: user.signupMethod,
          role: user.role,
          isEmailVerified: user.isEmailVerified,
          createdAt: user.createdAt
        },
        tokens
      }
    });

  } catch (error) {
    console.error("Signup error:", error);
    
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Email already exists"
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error during signup"
    });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password, loginMethod = LOGIN_METHODS.LOCAL } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    if (loginMethod === LOGIN_METHODS.LOCAL && !password) {
      return res.status(400).json({
        success: false,
        message: "Password is required for local login"
      });
    }

    // Find user by email
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Check if account is active
    if (!user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Account is deactivated"
      });
    }

    // Verify password for local login
    if (loginMethod === LOGIN_METHODS.LOCAL) {
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        return res.status(401).json({
          success: false,
          message: "Invalid email or password"
        });
      }
    }

    // Generate tokens with user role
    const tokens = generateTokens(user._id, user.role);

    // Update last login
    await user.updateLastLogin(loginMethod);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          signupMethod: user.signupMethod,
          role: user.role,
          lastLoggedIn: user.lastLoggedIn,
          isEmailVerified: user.isEmailVerified
        },
        tokens
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during login"
    });
  }
};

// Refresh Token Controller
export const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token is required"
      });
    }

    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);
    
    // Find user
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token"
      });
    }

    // Generate new access token with user role
    const accessToken = generateAccessToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: "Token refreshed successfully",
      data: {
        accessToken
      }
    });

  } catch (error) {
    console.error("Refresh token error:", error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Refresh token expired",
        code: 'REFRESH_TOKEN_EXPIRED'
      });
    }

    res.status(401).json({
      success: false,
      message: "Invalid refresh token"
    });
  }
};

// Logout Controller
export const logout = async (req, res) => {
  try {
    // In a more sophisticated setup, you might want to blacklist the token
    // For now, we'll just send a success response
    res.status(200).json({
      success: true,
      message: "Logged out successfully"
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Error during logout"
    });
  }
};

// Get User Profile Controller
export const getProfile = async (req, res) => {
  try {
    const user = req.user; // Set by auth middleware

    res.status(200).json({
      success: true,
      message: "Profile retrieved successfully",
      data: {
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          signupMethod: user.signupMethod,
          role: user.role,
          lastLoggedIn: user.lastLoggedIn,
          isEmailVerified: user.isEmailVerified,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      }
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving profile"
    });
  }
};

// Update User Profile Controller
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { fullName, email } = req.body;

    // Validation
    if (!fullName && !email) {
      return res.status(400).json({
        success: false,
        message: "At least one field (fullName or email) is required"
      });
    }

    const updateData = {};
    if (fullName) updateData.fullName = fullName.trim();
    if (email) {
      // Check if email is already taken by another user
      const existingUser = await User.findOne({ 
        email: email.toLowerCase().trim(), 
        _id: { $ne: userId } 
      });
      
      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "Email is already taken"
        });
      }
      
      updateData.email = email.toLowerCase().trim();
      updateData.isEmailVerified = false; // Reset verification if email changes
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: {
        user: updatedUser
      }
    });

  } catch (error) {
    console.error("Update profile error:", error);
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', ')
      });
    }

    res.status(500).json({
      success: false,
      message: "Error updating profile"
    });
  }
};

// Forgot Password Controller (placeholder)
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required"
      });
    }

    const user = await User.findByEmail(email);
    if (!user) {
      // Don't reveal if email exists or not for security
      return res.status(200).json({
        success: true,
        message: "If the email exists, a password reset link has been sent"
      });
    }

    // TODO: Implement email sending logic
    // Generate reset token, save to database, send email
    
    res.status(200).json({
      success: true,
      message: "If the email exists, a password reset link has been sent"
    });

  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({
      success: false,
      message: "Error processing forgot password request"
    });
  }
};

// Reset Password Controller (placeholder)
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Token and new password are required"
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long"
      });
    }

    // TODO: Implement password reset logic
    // Verify token, find user, update password
    
    res.status(200).json({
      success: true,
      message: "Password reset successful"
    });

  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({
      success: false,
      message: "Error resetting password"
    });
  }
};
