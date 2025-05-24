import { globalAK } from "@goauthentik/common/global";
import { applyDocumentTheme } from "@goauthentik/common/theme";

import { AKElement } from "@goauthentik/elements/Base";
import { BrandingContextController } from "@goauthentik/elements/controllers/BrandContextController";
import { ConfigContextController } from "@goauthentik/elements/controllers/ConfigContextController";
import { ModalOrchestrationController } from "@goauthentik/elements/controllers/ModalOrchestrationController";

import PFBase from "@patternfly/patternfly/patternfly-base.css";

/**
 * The base interface element for the application.
 */
export abstract class Interface extends AKElement {
    static styles = [PFBase];

    constructor() {
        super();

        const { config, brand } = globalAK();

        applyDocumentTheme(brand.uiTheme);

        this.addController(new ConfigContextController(this, config));
        this.addController(new BrandingContextController(this, brand));
        this.addController(new ModalOrchestrationController());
    }

    public connectedCallback(): void {
        super.connectedCallback();
        this.dataset.akInterfaceRoot = this.tagName.toLowerCase();
    }
}
