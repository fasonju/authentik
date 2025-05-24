import { resolveUITheme, rootInterface } from "@goauthentik/common/theme";

import type { AKElement } from "@goauthentik/elements/Base";

export function themeImage(rawPath: string) {
    const enabledTheme = rootInterface<AKElement>()?.activeTheme || resolveUITheme();

    return rawPath.replaceAll("%(theme)s", enabledTheme);
}
