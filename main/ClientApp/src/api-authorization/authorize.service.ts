import { Injectable } from '@angular/core';
import { User, UserManager } from 'oidc-client';
import { BehaviorSubject, concat, from, Observable } from 'rxjs';
import { filter, map, mergeMap, take, tap } from 'rxjs/operators';
import { UserCompType } from '../app/classes/basedata';
import {
  ApplicationName,
  ApplicationPaths,
} from './api-authorization.constants';

export type IAuthenticationResult =
  | SuccessAuthenticationResult
  | FailureAuthenticationResult
  | RedirectAuthenticationResult;

export interface SuccessAuthenticationResult {
  status: AuthenticationResultStatus.Success;
  state: any;
}

export interface FailureAuthenticationResult {
  status: AuthenticationResultStatus.Fail;
  message: string;
}

export interface RedirectAuthenticationResult {
  status: AuthenticationResultStatus.Redirect;
}

export enum AuthenticationResultStatus {
  Success,
  Redirect,
  Fail,
}

export interface IUser {
  name?: string;
  fullname?: string;
  role: string[];
  userist: number[];
  usetype: number[];
  usercomptype: UserCompType[];
}
export interface UserProp {
  name?: string;
  role: string[];
  userist: number[];
  usetype: number[];
  usercomptype: UserCompType[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthorizeService {
  // By default pop ups are disabled because they don't work properly on Edge.
  // If you want to enable pop up authentication simply set this flag to false.
  private popUpDisabled = true;
  private userManager: UserManager;
  private userSubject: BehaviorSubject<IUser | null> = new BehaviorSubject(
    null
  );

  public getUserprop(): Observable<UserProp> {
    return this.userSubject.asObservable().pipe(
      map(
        (u: any) =>
          <UserProp>{
            name: u.name,
            role: u.role,
            userist: u.userist,
            usetype: u.usetype,
            usercomptype: <UserCompType[]>u.usercomptype,
          }
      )
      // tap(u => console.log(u.usercomptype))
    );
  }
  public getUseremail(): Observable<string> {
    return this.userSubject.asObservable().pipe(
      map((u: any) => u.name)
      // tap(u => console.log(u.usercomptype))
    );
  }
  public getUsercomptype(): Observable<UserCompType[]> {
    return this.userSubject
      .asObservable()
      .pipe(map((u: any) => u && u.usercomptype));
  }

  public getUser(): Observable<IUser | null> {
    return concat(
      this.userSubject.pipe(
        take(1),
        filter((u) => !!u)
      ),
      this.getUserFromStorage().pipe(
        filter((u) => !!u),
        tap((user: IUser) => {
          // console.log(user)
          if (typeof user.role === 'string') {
            user.role = [user.role];
          }
          if (!(user.userist instanceof Array)) {
            user.userist = [user.userist];
          }
          if (!(user.usetype instanceof Array)) {
            user.usetype = [user.usetype];
          }
     
          if (user?.usercomptype?.length > 0) {
            const userctjson: UserCompType[] = [];

            if (user?.usercomptype instanceof Array) {
              user.usercomptype.forEach((c) => {
                const uct = JSON.parse(JSON.parse(JSON.stringify(c)));
                userctjson.push(uct);
              });
              user.usercomptype = userctjson;
            } else {
              const uct = JSON.parse(
                JSON.parse(JSON.stringify(user.usercomptype))
              );
              userctjson.push(uct);
              user.usercomptype = userctjson;
            }
          }
        }),
        tap((u) => this.userSubject.next(u))
      ),
      this.userSubject.asObservable()
    );
  }
  public isAuthenticated(): Observable<boolean> {
    return this.getUser().pipe(map((u) => !!u));
  }
  public isAdmin(): Observable<boolean> {
    return this.getUser().pipe(
      map(
        (u: IUser) =>
          (!!u && u?.role?.indexOf('Muder') > -1) ||
          u?.role?.indexOf('SuperMuder') > -1
      )
    );
  }
  public isCalldiruser(): Observable<boolean> {
    return this.getUser().pipe(
      map((u: IUser) => !!u && u?.role?.indexOf('Dir973') > -1)
    );
  }
  public ishospuser(): Observable<boolean> {
    return this.getUser().pipe(
      // tap(u => console.log(u)),
      map(
        (u: IUser) =>
          (!!u && u?.role?.indexOf('HospClinic') > -1) ||
          u?.role?.indexOf('Hosp') > -1 ||
          u?.role?.indexOf('Clinic') > -1
      )
    );
  }
  public isclinicuser(): Observable<boolean> {
    return this.getUser().pipe(
      map((u: IUser) => !!u && u?.role?.indexOf('Clinic') > -1)
    );
  }
  public isadminhospuser(): Observable<boolean> {
    return this.getUser().pipe(
      map((u: IUser) => !!u && u?.role?.indexOf('AdminHosp') > -1)
    );
  }
  public isadminclinicuser(): Observable<boolean> {
    return this.getUser().pipe(
      map((u: IUser) => !!u && u?.role?.indexOf('AdminClinic') > -1)
    );
  }
  public comp1(): Observable<boolean> {
    return this.getUser().pipe(
      map((u: IUser) => !!u && u?.usercomptype?.some((x) => x.value === 1))
    );
  }
  public comp2(): Observable<boolean> {
    return this.getUser().pipe(
      map((u: IUser) => !!u && u?.usercomptype?.some((x) => x.value === 2))
    );
  }
  public ismohandadmin(): Observable<boolean> {
    return this.getUser().pipe(
      map(
        (u: IUser) =>
          (!!u && u?.role?.indexOf('Muder') > -1) ||
          u?.role?.indexOf('MohDir') > -1
      )
    );
  }

  public getAccessToken(): Observable<string | null> {
    return from(this.ensureUserManagerInitialized()).pipe(
      mergeMap(() => from(this.userManager!.getUser())),
      map((user) => user && user.access_token)
    );
  }

  // We try to authenticate the user in three different ways:
  // 1) We try to see if we can authenticate the user silently. This happens
  //    when the user is already logged in on the IdP and is done using a hidden iframe
  //    on the client.
  // 2) We try to authenticate the user using a PopUp Window. This might fail if there is a
  //    Pop-Up blocker or the user has disabled PopUps.
  // 3) If the two methods above fail, we redirect the browser to the IdP to perform a traditional
  //    redirect flow.
  public async signIn(state: any): Promise<IAuthenticationResult> {
    await this.ensureUserManagerInitialized();
    let user: User | null = null;
    try {
      user = await this.userManager!.signinSilent(this.createArguments());
      if (user !== undefined) {
        if (typeof user?.profile.role === 'string') {
          user.profile.role = [user.profile.role];
        }
        if (!(user?.profile?.userist instanceof Array)) {
          user.profile.userist = [user.profile.userist];
        }
        if (!(user?.profile?.usetype instanceof Array)) {
          user.profile.usetype = [user.profile.usetype];
        }
        // if (!(user?.profile?.usercomptype instanceof Array)) {
        // let uct = JSON.parse(user?.profile?.usercomptype);
        //  user.profile.usercomptype = [uct];
        // }
        if (user?.profile?.usercomptype?.length > 0) {
          const userctjson: UserCompType[] = [];

          if (user?.profile?.usercomptype instanceof Array) {
            user.profile.usercomptype.forEach((c) => {
              const uct = JSON.parse(JSON.parse(JSON.stringify(c)));
              userctjson.push(uct);
            });
            user.profile.usercomptype = userctjson;
          } else {
            const uct = JSON.parse(
              JSON.parse(JSON.stringify(user.profile.usercomptype))
            );
            userctjson.push(uct);
            user.profile.usercomptype = userctjson;
          }
        }
      }
      this.userSubject.next(user && user?.profile);
      return this.success(state);
    } catch (silentError) {
      // User might not be authenticated, fallback to popup authentication
      console.log('Silent authentication error: ', silentError);

      try {
        if (this.popUpDisabled) {
          throw new Error(
            'Popup disabled. Change "authorize.service.ts:AuthorizeService.popupDisabled" to false to enable it.'
          );
        }
        user = await this.userManager!.signinPopup(this.createArguments());
        if (user !== undefined) {
          if (typeof user?.profile.role === 'string') {
            user.profile.role = [user.profile.role];
          }
          if (!(user?.profile?.userist instanceof Array)) {
            user.profile.userist = [user.profile.userist];
          }
          if (!(user?.profile?.usetype instanceof Array)) {
            user.profile.usetype = [user.profile.usetype];
          }
          // if (!(user?.profile?.usercomptype instanceof Array)) {
          // // user.profile.usercomptype = [user.profile.usercomptype];
          //  let uct = JSON.parse(user?.profile?.usercomptype);
          //  user.profile.usercomptype = [uct];
          // }
          if (user?.profile?.usercomptype?.length > 0) {
            const userctjson: UserCompType[] = [];

            if (user?.profile?.usercomptype instanceof Array) {
              user.profile.usercomptype.forEach((c) => {
                const uct = JSON.parse(JSON.parse(JSON.stringify(c)));
                userctjson.push(uct);
              });
              user.profile.usercomptype = userctjson;
            } else {
              const uct = JSON.parse(
                JSON.parse(JSON.stringify(user.profile.usercomptype))
              );
              userctjson.push(uct);
              user.profile.usercomptype = userctjson;
            }
          }
        }
        this.userSubject.next(user && user?.profile);
        return this.success(state);
      } catch (popupError: any) {
        if (popupError.message === 'Popup window closed') {
          // The user explicitly cancelled the login action by closing an opened popup.
          return this.error('The user closed the window.');
        } else if (!this.popUpDisabled) {
          console.log('Popup authentication error: ', popupError);
        }

        // PopUps might be blocked by the user, fallback to redirect
        try {
          await this.userManager.signinRedirect(this.createArguments(state));
          return this.redirect();
        } catch (redirectError) {
          console.log('Redirect authentication error: ', redirectError);
          return this.error(redirectError);
        }
      }
    }
  }

  public async completeSignIn(url: string): Promise<IAuthenticationResult> {
    try {
      console.log('completeSignIn');
      await this.ensureUserManagerInitialized();
      const user = await this.userManager.signinCallback(url);
      if (user !== undefined) {
        if (typeof user?.profile?.role === 'string') {
          user.profile.role = [user.profile.role];
        }
        if (!(user?.profile?.userist instanceof Array)) {
          user.profile.userist = [user.profile.userist];
        }
        if (!(user?.profile?.usetype instanceof Array)) {
          user.profile.usetype = [user.profile.usetype];
        }
        // if (!(user?.profile?.usercomptype instanceof Array)) {
        // // user.profile.usercomptype = [user.profile.usercomptype];
        //  let uct = JSON.parse(user?.profile?.usercomptype);
        //  user.profile.usercomptype = [uct];
        // }
        if (user?.profile?.usercomptype?.length > 0) {
          const userctjson: UserCompType[] = [];

          if (user?.profile?.usercomptype instanceof Array) {
            user.profile.usercomptype.forEach((c) => {
              const uct = JSON.parse(JSON.parse(JSON.stringify(c)));
              userctjson.push(uct);
            });
            user.profile.usercomptype = userctjson;
          } else {
            const uct = JSON.parse(
              JSON.parse(JSON.stringify(user.profile.usercomptype))
            );
            userctjson.push(uct);
            user.profile.usercomptype = userctjson;
          }
        }
      }
      this.userSubject.next(user && user?.profile);
      return this.success(user && user.state);
    } catch (error) {
      console.log('There was an error signing in: ', error);
      return this.error('There was an error signing in.');
    }
  }

  public async signOut(state: any): Promise<IAuthenticationResult> {
    try {
      if (this.popUpDisabled) {
        throw new Error(
          "Popup disabled. Change 'authorize.service.ts:AuthorizeService.popupDisabled' to false to enable it."
        );
      }
      await this.ensureUserManagerInitialized();
      await this.userManager!.signoutPopup(this.createArguments());
      this.userSubject.next(null);
      return this.success(state);
    } catch (popupSignOutError: any) {
      console.log('Popup signout error: ', popupSignOutError);
      try {
        await this.userManager!.signoutRedirect(this.createArguments(state));
        return this.redirect();
      } catch (redirectSignOutError: any) {
        console.log('Redirect signout error: ', redirectSignOutError);
        return this.error(redirectSignOutError);
      }
    }
  }

  public async completeSignOut(url: string): Promise<IAuthenticationResult> {
    await this.ensureUserManagerInitialized();
    try {
      const response = await this.userManager!.signoutCallback(url);
      this.userSubject.next(null);
      return this.success(response && response.state);
    } catch (error: any) {
      console.log(`There was an error trying to log out '${error}'.`);
      return this.error(error);
    }
  }

  private createArguments(state?: any): any {
    return { useReplaceToNavigate: true, data: state };
  }

  private error(message: string): IAuthenticationResult {
    return { status: AuthenticationResultStatus.Fail, message };
  }

  private success(state: any): IAuthenticationResult {
    return { status: AuthenticationResultStatus.Success, state };
  }

  private redirect(): IAuthenticationResult {
    // console.log('redirect');
    return { status: AuthenticationResultStatus.Redirect };
  }

  private async ensureUserManagerInitialized(): Promise<void> {
    if (this.userManager !== undefined) {
      return;
    }

    const response = await fetch(
      ApplicationPaths.ApiAuthorizationClientConfigurationUrl
    );
    if (!response.ok) {
      throw new Error(`Could not load settings for '${ApplicationName}'`);
    }

    const settings: any = await response.json();
    settings.automaticSilentRenew = true;
    settings.includeIdTokenInSilentRenew = true;
    this.userManager = new UserManager(settings);

    this.userManager.events.addUserSignedOut(async () => {
      await this.userManager.removeUser();
      this.userSubject.next(null);
    });
  }

  private getUserFromStorage(): Observable<IUser | null> {
    return from(this.ensureUserManagerInitialized()).pipe(
      mergeMap(() => this.userManager.getUser()),

      map((u: User) => u && u.profile)
    );
  }
}
// public ismohuser(): Observable<boolean> {
//  //if ( this.isAuthenticated().subscribe(() => {  return this.getUser().pipe(
//  //  map((u) => (!!u && u?.role?.indexOf('Hosp') > -1) || u?.role?.indexOf('Clinic') > -1 || u?.role?.indexOf('Beds') > -1));
//  //})) {

//  //}
//  return this.getUser().pipe(
//    map( (u) => (!!u && u?.role?.indexOf('Hosp') > -1) ||  u?.role?.indexOf('Clinic') > -1 ||  u?.role?.indexOf('Dir973') > -1 ));
// }

// public isstaticdiruser(): Observable<boolean> {
//  return this.getUser().pipe(
//    tap((u) => {
//      // console.log(u);
//    }),
//    map((u) => !!u && u?.role?.indexOf('StaticDir') > -1)
//  );
// }

// public isbeduser(): Observable<boolean> {
//   return this.getUser().pipe(
//     map((u) => {
//       console.log(u);
//       if (u?.role.length > 0) {
//         for (const rolesKey in u?.role) {
//           if (u?.role[rolesKey] === 'Hosp') {
//             console.log('user does have role: ' + 'Hosp');
//             return true;
//           }
//         }
//       } else {
//         return false;
//       }
//     })
//   );
// }
// public isadminbeduser(): Observable<boolean> {
//   return this.getUser().pipe(
//     map((u) => {
//       console.log(u?.role.length);
//       if (u?.role.length > 0) {
//         for (const rolesKey in u?.role) {
//           if (u?.role[rolesKey] === 'AdminHosp') {
//             console.log('user does have role: ' + 'AdminHosp');
//             return true;
//           }
//         }
//       } else {
//         return false;
//       }
//     })
//   );
// }
// public isbed2user(): Observable<boolean> {
//   return this.getUser().pipe(
//     map(
//       (u) =>
//         (!!u && u?.role?.indexOf('Beds') > -1) || u?.role?.indexOf('Hosp') > -1
//     )
//   );
// }
