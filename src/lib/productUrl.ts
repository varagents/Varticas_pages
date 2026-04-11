import { redirectToProductWithSession } from "@/lib/codeService";

/** Public marketing URL (new tab) for visitors who are not signed in. */
export const VARTICAS_PRODUCT_URL = "https://product.varticas.com";

export function openVarticasProductInNewTab() {
    window.open(VARTICAS_PRODUCT_URL, "_blank", "noopener,noreferrer");
}

/**
 * Signed-in: same handoff as Dashboard "Launch Varticas" — session via hash to
 * `VITE_PRODUCT_APP_URL` /auth/callback (see codeService).
 * Signed-out: open {@link VARTICAS_PRODUCT_URL} in a new tab.
 */
export function openProductCta(isSignedIn: boolean) {
    if (isSignedIn) {
        void redirectToProductWithSession().catch(() => {
            openVarticasProductInNewTab();
        });
    } else {
        openVarticasProductInNewTab();
    }
}
