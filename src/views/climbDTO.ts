// View: paginação, lista de produtos, o que vai pras rotas
// DTO : Data Transfer Object

type TClimbDTO = {
  id: number;
  name: string;
};

class ClimbDTO {
  id: number;
  name: string;
  constructor({ id, name }: TClimbDTO) {
    this.id = id;
    this.name = name;
  }
}

export default ClimbDTO;
