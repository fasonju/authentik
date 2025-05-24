import "@patternfly/elements/pf-tooltip/pf-tooltip.js";
import "@goauthentik/elements/buttons/SpinnerButton/ak-spinner-button";
import "@goauthentik/elements/forms/DeleteBulkForm";
import "@goauthentik/elements/forms/ModalForm";
import "@goauthentik/elements/forms/ProxyForm";

import { DEFAULT_CONFIG } from "@goauthentik/common/api/config";

import { PaginatedResponse, Table, TableColumn } from "@goauthentik/elements/table/Table";

import { SSFStream, SsfApi } from "@goauthentik/api";

import { msg } from "@lit/localize";
import { TemplateResult, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ak-provider-ssf-stream-list")
export class SSFProviderStreamList extends Table<SSFStream> {
    searchEnabled(): boolean {
        return true;
    }
    checkbox = true;
    clearOnRefresh = true;

    @property({ type: Number })
    providerId?: number;

    @property()
    order = "name";

    async apiEndpoint(): Promise<PaginatedResponse<SSFStream>> {
        return new SsfApi(DEFAULT_CONFIG).ssfStreamsList({
            provider: this.providerId,
            ...(await this.defaultEndpointConfig()),
        });
    }

    columns(): TableColumn[] {
        return [new TableColumn(msg("Audience"), "aud")];
    }

    row(item: SSFStream): TemplateResult[] {
        return [html`${item.aud}`];
    }
}

declare global {
    interface HTMLElementTagNameMap {
        "ak-provider-ssf-stream-list": SSFProviderStreamList;
    }
}
