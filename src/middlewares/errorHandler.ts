import DBError from "../errors/dberro";

const errorHandler = (error: Error, req: any, res: any, next: (v?: any) => void) => {
  if (error instanceof DBError) {
    res.status(400).send("Bad request");
  } else if (error) {
    next(error);
  } else {
    next();
  }

}

export default errorHandler;