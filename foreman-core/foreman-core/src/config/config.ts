export class Config {
  static readonly jwtSecretKey: string = 'secretKey';
  static readonly jwtRefreshTokenSecretKey: string = 'anotherSecretKey';
  static readonly expiresIn: number = 5;
  static readonly expiresRefreshToken: number = 30;
}
