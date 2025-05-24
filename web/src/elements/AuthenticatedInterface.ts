import { Interface } from "@goauthentik/elements/Interface";
import { LicenseContextController } from "@goauthentik/elements/controllers/LicenseContextController";
import { VersionContextController } from "@goauthentik/elements/controllers/VersionContextController";

export class AuthenticatedInterface extends Interface {
    constructor() {
        super();

        this.addController(new LicenseContextController(this));
        this.addController(new VersionContextController(this));
    }
}
