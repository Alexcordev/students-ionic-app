const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {type: String, required: true },
  password: {type: String, required: true},
	createdOn: { type: Date, default: Date.now }
});

userSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;

      next();
    });
  });

  userSchema.methods.validPassword = function(password) {
    var user = this;
    return bcrypt.compareSync(password, user.password);
  }

module.exports = mongoose.model('User', userSchema);
