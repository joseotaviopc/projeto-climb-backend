type TUserDTO = {
  name: string;
  lastName: string;
  email: string;
};

class UserDTO {
  name: string;
  lastName: string;
  email: string;
  constructor({ name, lastName, email }: TUserDTO) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
  }
}

export default UserDTO;
