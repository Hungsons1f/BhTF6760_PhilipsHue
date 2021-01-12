/*
 * Generated 8/26/2020 11:35:22 AM
 * Copyright (C) 2020
 */
module TcHmi {
    export module Controls {
        export module Philips_Hue_Color {
            export class Philips_Hue_ColorControl extends TcHmi.Controls.System.TcHmiControl {

                /*
                Attribute philosophy
                --------------------
                - Local variables are not set while definition in class, so they have the value 'undefined'.
                - On compile the Framework sets the value from HTML or from theme (possibly 'null') via normal setters
                - The "changed detection" in the setter will result in processing the value only once while compile
                - Attention: If we have a Server Binding on an Attribute the setter can be very late or never (leaving the value = undefined).
                */

                /**
                 * @description Constructor of the control
                 * @param {JQuery} element Element from HTML (internal, do not use)
                 * @param {JQuery} pcElement precompiled Element (internal, do not use)
                 * @param {TcHmi.Controls.ControlAttributeList} attrs Attributes defined in HTML in a special format (internal, do not use)
                 * @returns {void}
                 */

                protected __uJsonVal = 0;
                protected __uColor = [0, 0, 0];
                protected __uContinue = false;
                protected __uShowAdvanced:any = false;

                constructor(element: JQuery, pcElement: JQuery, attrs: TcHmi.Controls.ControlAttributeList) {
                    /** Call base class constructor */
                    super(element, pcElement, attrs);
                }

                protected __elementTemplateRoot!: JQuery;
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
                public __previnit() {
                    // Fetch template root element
                    this.__elementTemplateRoot = this.__element.find('.TcHmi_Controls_Philips_Hue_Color_Philips_Hue_ColorControl-Template');
                    if (this.__elementTemplateRoot.length === 0) {
                        throw new Error('Invalid Template.html');
                    }

                    this.__eCommandUrl = this.__element.find('.cydeus-philips-hue-url');
                    this.__eResponse = this.__element.find('.cydeus-philips-hue-response');
                    this.__eMessageBody = this.__element.find('.cydeus-philips-hue-messagebody');
                    this.__eButton = this.__element.find('.cydeus-philips-hue-button');
                    this.__eGet = this.__element.find('.cydeus-philips-hue-btnGet');
                    this.__ePut = this.__element.find('.cydeus-philips-hue-btnPut');
                    this.__ePost = this.__element.find('.cydeus-philips-hue-btnPost');
                    this.__eDelete = this.__element.find('.cydeus-philips-hue-btnDelete');
                    this.__eColor = this.__element.find('.cydeus-philips-hue-disc');
                    this.__ePutColor = this.__element.find('.cydeus-philips-hue-btnPutColor');
                    this.__eAdvanced = this.__element.find('.cydeus-philips-hue-advanced');

                    // Call __previnit of base class
                    super.__previnit();
                }
                /** 
                 * @description Is called during control initialize phase after attribute setter have been called based on it's default or initial html dom values. 
                 * @returns {void}
                 */
                public __init() {
                    super.__init();
                }

                /**
                * @description Is called by tachcontrol() after the control instance gets part of the current DOM.
                * Is only allowed to be called from the framework itself!
                */

                public __attach() {
                    super.__attach();

                    /**
                     * Initialize everything which is only available while the control is part of the active dom.
                     */
                    this.__eGet.on("click", () => {
                        this.getHTML(this.__eGet.val());
                    });
                    this.__ePut.on("click", () => {
                        this.getHTML(this.__ePut.val());
                    });
                    this.__ePost.on("click", () => {
                        this.getHTML(this.__ePost.val());
                    });
                    this.__eDelete.on("click", () => {
                        this.getHTML(this.__eDelete.val());
                    });
                    this.__ePutColor.on("click", () => {
                        if (this.__uContinue) {
                            this.__uContinue = false;
                            this.__ePutColor.css({
                                background: "#ededed"
                            })
                        }
                        else {
                            this.__uContinue = true;
                            this.__ePutColor.css({
                                background: "#70ff66"
                            })
                        }                         
                    });
                    let timer = setInterval(() => {
                        if (this.__uContinue) {
                            this.__uColor = this.getColor();
                            this.changeColor(this.__uColor);
                        }
                    }, 200);
                }

                /**
                * @description Is called by tachcontrol() after the control instance is no longer part of the current DOM.
                * Is only allowed to be called from the framework itself!
                */
                public __detach() {
                    super.__detach();

                    /**
                     * Disable everything which is not needed while the control is not part of the active dom.
                     * No need to listen to events for example!
                     */
                }

                /**
                * @description Destroy the current control instance. 
                * Will be called automatically if system destroys control!
                */
                public destroy() {
                    /**
                    * While __keepAlive is set to true control must not be destroyed.
                    */
                    if (this.__keepAlive) {
                        return;
                    }

                    super.destroy();

                    /**
                    * Free resources like child controls etc.
                    */
                }

                public getColor() {
                    var str = this.__eColor.attr('color') as string;
                    var sub = str.slice(4, str?.length - 1).split(',');
                    var hue = Math.round(+sub[0] * 65535 / 365);
                    var sat = Math.round(+sub[1].substr(0, sub[1].length - 1) * 254 / 100);
                    var bri = Math.round(+sub[2].substr(0, sub[2].length - 1) * 254 / 100);
                    return [hue, sat, bri];
                }

                public getHTML(command: any) {
                    var http = new XMLHttpRequest();
                    http.open(command, this.__eCommandUrl.val() as string, true);

                    if (command != "PUT") {
                        http.send(this.__eMessageBody.val() as string);
                    }
                    else {
                        var jsonbody = "{\"hue\": " + this.__uJsonVal + ", \"transitiontime\": 1}";
                        http.send(jsonbody);
                        this.__uJsonVal += 10000;
                        if (this.__uJsonVal > 60000) this.__uJsonVal = 0;
                    }

                    http.onreadystatechange = () => {
                        if (http.readyState == 4) {
                            if (http.status == 200) {
                                this.__eResponse.val("Bad JSON: " + http.responseText);
                                this.__eResponse.val(JSON.stringify(JSON.parse(http.responseText), null, '\t'));
                            } else {
                                this.__eResponse.val("Error " + http.status);
                            }
                        }
                    }
                }

                public changeColor(Color: any) {
                    var http = new XMLHttpRequest();
                    http.open("PUT", this.__eCommandUrl.val() as string, true);

                    var jsonbody = "{\"hue\": " + Color[0] + ", \"sat\": " + Color[1] + ", \"bri\": " + Color[2] + ", \"transitiontime\": 1}";
                    http.send(jsonbody);

                    http.onreadystatechange = () => {
                        if (http.readyState == 4) {
                            if (http.status == 200) {
                                this.__eResponse.val("Bad JSON: " + http.responseText);
                                this.__eResponse.val(JSON.stringify(JSON.parse(http.responseText), null, '\t'));
                            } else {
                                this.__eResponse.val("Error " + http.status);
                            }
                        }
                    }
                }

                public setShowAdvanced(valueNew: any) {
                    // convert the new value
                    var convertedValue = TcHmi.ValueConverter.toBoolean(valueNew);

                    // if converted value is null, get internal default
                    if (convertedValue === null) {
                        convertedValue = this.getAttributeDefaultValueInternal('ShowAdvanced');
                    }

                    // skip processing when the value has not changed
                    if (convertedValue === this.__uShowAdvanced) {
                        return;
                    }

                    // save new value
                    this.__uShowAdvanced = convertedValue;

                    // Inform the system that the function has a changed result.
                    TcHmi.EventProvider.raise(this.__id + ".onFunctionResultChanged", ["getShowAdvanced"]);

                    // process the new value
                    this.__processShowAdvanced();
                };

                public getShowAdvanced() {
                    // return the current text
                    return this.__uShowAdvanced;
                };

                public __processShowAdvanced() {
                    // set text to html element
                    if (this.__uShowAdvanced) {
                        this.__eAdvanced.css({
                            visibility: "visible"
                        })
                    }
                    else {
                        this.__eAdvanced.css({
                            visibility: "collapse"
                        })
                    }
                };

            }
        }

        registerEx('Philips_Hue_ColorControl', 'TcHmi.Controls.Philips_Hue_Color', Philips_Hue_Color.Philips_Hue_ColorControl);
    }
}