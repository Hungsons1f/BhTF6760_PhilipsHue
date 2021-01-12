declare module TcHmi {
    module Controls {
        module Philips_Hue_Color {
            class Philips_Hue_ColorControl extends TcHmi.Controls.System.TcHmiControl {
                /**
                 * @description Constructor of the control
                 * @param {JQuery} element Element from HTML (internal, do not use)
                 * @param {JQuery} pcElement precompiled Element (internal, do not use)
                 * @param {TcHmi.Controls.ControlAttributeList} attrs Attributes defined in HTML in a special format (internal, do not use)
                 * @returns {void}
                 */
                protected __uJsonVal: number;
                protected __uColor: number[];
                protected __uContinue: boolean;
                protected __uShowAdvanced: any;
                constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList);
                protected __elementTemplateRoot: JQuery;
                protected __eCommandUrl: JQuery;
                protected __eResponse: JQuery;
                protected __eMessageBody: JQuery;
                protected __eButton: JQuery;
                protected __eGet: JQuery;
                protected __ePut: JQuery;
                protected __ePost: JQuery;
                protected __eDelete: JQuery;
                protected __eColor: JQuery;
                protected __ePutColor: JQuery;
                protected __eAdvanced: JQuery;
                /**
                  * If raised, the control object exists in control cache and constructor of each inheritation level was called.
                  * Call attribute processor functions here to initialize default values!
                  */
                __previnit(): void;
                /**
                 * @description Is called during control initialize phase after attribute setter have been called based on it's default or initial html dom values.
                 * @returns {void}
                 */
                __init(): void;
                /**
                * @description Is called by tachcontrol() after the control instance gets part of the current DOM.
                * Is only allowed to be called from the framework itself!
                */
                __attach(): void;
                /**
                * @description Is called by tachcontrol() after the control instance is no longer part of the current DOM.
                * Is only allowed to be called from the framework itself!
                */
                __detach(): void;
                /**
                * @description Destroy the current control instance.
                * Will be called automatically if system destroys control!
                */
                destroy(): void;
                getColor(): number[];
                getHTML(command: any): void;
                changeColor(Color: any): void;
                setShowAdvanced(valueNew: any): void;
                getShowAdvanced(): any;
                __processShowAdvanced(): void;
            }
        }
    }
}
