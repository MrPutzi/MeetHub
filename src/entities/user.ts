export class User {
  public role: string = 'user';

  public static clone(user: User): User {
    return new User(
      user.name,
      user.email,
      user.id,
      user.lastLogin ? new Date(user.lastLogin) : undefined,
      user.password,
      user.active ?? true,
    );
  }

  constructor(
    public name: string,
    public email: string,
    public id?: number,
    public lastLogin?: Date,
    public password = '',
    public active = true,
  ) {}

  public toString() {
    return this.name + ", email:" + this.email + ", id:" + this.id;
  }
}
