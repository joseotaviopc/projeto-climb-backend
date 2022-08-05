import moment from "moment";

type TTokenDTO = {
  _id: string;
  token: string;
  expireAt: Date;
  createdAt: Date;
};

// moment.js => trabalhar com datas

class tokenDTO {
  token!: string;
  expireAt!: Date | moment.Moment;
  constructor({ _id, createdAt }: TTokenDTO) {
    const expireAt = moment(createdAt);
    expireAt.add(3, "d");

    this.token = _id;
    this.expireAt = expireAt.toDate();
  }
}

export default tokenDTO;
