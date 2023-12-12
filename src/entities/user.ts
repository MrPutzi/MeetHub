
export class User {
  public static clone(user: User): User {
    return new User(user.name, 
                    user.email, 
                    user.id, 
                    user.lastLogin? new Date(user.lastLogin): undefined, 
                    user.password,
                    user.active === undefined ? true : user.active ,
                    );
  } 

  constructor(
    public name: string,
    public email: string,
    public id?: number,
    public lastLogin?: Date,
    public password = '',
    public active = true,
  ){}

  public toString() {
    return this.name + ", email:"+ this.email + ", id:" + this.id; 
  }
}
