class User {
  setFirstName(firstName) {
    this.first_name = firstName;
    return this;
  }
  setLastName(lastName) {
    this.last_name = lastName;
    return this;
  }
  setGender(gender) {
    this.gender = gender;
    return this;
  }
  setBirthDate(birthDate) {
    this.birth_date = birthDate;
    return this;
  }
  setImage(image) {
    this.image = image;
    return this;
  }
  getUser() {
    return {
      first_name: this.first_name,
      last_name: this.last_name,
      gender: this.gender,
      birth_date: this.birth_date,
      image: this.image,
    };
  }
}

module.exports = {
  User,
};
