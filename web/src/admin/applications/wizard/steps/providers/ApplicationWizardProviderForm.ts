import "@goauthentik/elements/forms/FormGroup";
import "@goauthentik/elements/forms/HorizontalFormElement";
import "@goauthentik/components/ak-number-input";
import "@goauthentik/components/ak-radio-input";
import "@goauthentik/components/ak-switch-input";
import "@goauthentik/components/ak-text-input";

import { camelToSnake } from "@goauthentik/common/utils";

import { AKElement } from "@goauthentik/elements/Base";
import { KeyUnknown, serializeForm } from "@goauthentik/elements/forms/Form";
import { HorizontalFormElement } from "@goauthentik/elements/forms/HorizontalFormElement";

import { styles as AwadStyles } from "@goauthentik/admin/applications/wizard/ApplicationWizardFormStepStyles";

import { property, query } from "lit/decorators.js";

import { type ApplicationWizardState, type OneOfProvider } from "../../types.js";

export class ApplicationWizardProviderForm<T extends OneOfProvider> extends AKElement {
    static get styles() {
        return AwadStyles;
    }

    label = "";

    @property({ type: Object, attribute: false })
    wizard!: ApplicationWizardState;

    @property({ type: Object, attribute: false })
    errors: Record<string | number | symbol, string> = {};

    @query("form#providerform")
    form!: HTMLFormElement;

    get formValues(): KeyUnknown | undefined {
        const elements = [
            ...Array.from(
                this.form.querySelectorAll<HorizontalFormElement>("ak-form-element-horizontal"),
            ),
            ...Array.from(this.form.querySelectorAll<HTMLElement>("[data-ak-control=true]")),
        ];
        return serializeForm(elements as unknown as NodeListOf<HorizontalFormElement>);
    }

    get valid() {
        this.errors = {};
        return this.form.checkValidity();
    }

    errorMessages(name: string) {
        return name in this.errors
            ? [this.errors[name]]
            : (this.wizard.errors?.provider?.[name] ??
                  this.wizard.errors?.provider?.[camelToSnake(name)] ??
                  []);
    }

    isValid(name: keyof T) {
        return !(
            (this.wizard.errors?.provider?.[name as string] ?? []).length > 0 ||
            this.errors?.[name] !== undefined
        );
    }
}
