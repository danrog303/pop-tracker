import jwt_decode from "jwt-decode";

/**
 * Stores basic credentials of the authenticated user.
 */
export class UserDetails {
  userId: string;
  accessToken: string;
  refreshToken: string;
  accessTokenExpiration: Date;

  constructor(accessToken: string, refreshToken: string) {
    const accessTokenDecoded: any = jwt_decode(accessToken);

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.userId = accessTokenDecoded.username;
    this.accessTokenExpiration = new Date(accessTokenDecoded.exp * 1000);
  }
}
