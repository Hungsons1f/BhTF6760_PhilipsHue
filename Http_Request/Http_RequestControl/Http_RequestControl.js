/*
 * Generated 8/25/2020 11:55:38 AM
 * Copyright (C) 2020
 */
var TcHmi;
(function (TcHmi) {
    let Controls;
    (function (Controls) {
        let Http_Request;
        (function (Http_Request) {
            class Http_RequestControl extends TcHmi.Controls.System.TcHmiControl {
                constructor(element, pcElement, attrs) {
                    /** Call base class constructor */
                    super(element, pcElement, attrs);
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
                    this.__uJsonVal = 0;
                }
                /**
                  * If raised, the control object exists in control cache and constructor of each inheritation level was called.
                  * Call attribute processor functions here to initialize default values!
                  */
                __previnit() {
                    // Fetch template root element
                    this.__elementTemplateRoot = this.__element.find('.TcHmi_Controls_Http_Request_Http_RequestControl-Template');
                    if (this.__elementTemplateRoot.length === 0) {
                        throw new Error('Invalid Template.html');
                    }
                    this.__eCommandUrl = this.__element.find('.cydeus-http-commandurl');
                    this.__eResponse = this.__element.find('.cydeus-http-response');
                    this.__eMessageBody = this.__element.find('.cydeus-http-messagebody');
                    this.__eButton = this.__element.find('.cydeus-http-buttons');
                    this.__eGet = this.__element.find('.cydeus-http-btnGet');
                    this.__ePut = this.__element.find('.cydeus-http-btnPut');
                    this.__ePost = this.__element.find('.cydeus-http-btnPost');
                    this.__eDelete = this.__element.find('.cydeus-http-btnDelete');
                    // Call __previnit of base class
                    super.__previnit();
                }
                /**
                 * @description Is called during control initialize phase after attribute setter have been called based on it's default or initial html dom values.
                 * @returns {void}
                 */
                __init() {
                    super.__init();
                }
                /**
                * @description Is called by tachcontrol() after the control instance gets part of the current DOM.
                * Is only allowed to be called from the framework itself!
                */
                __attach() {
                    super.__attach();
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
                    /**
                     * Initialize everything which is only available while the control is part of the active dom.
                     */
                }
                /**
                * @description Is called by tachcontrol() after the control instance is no longer part of the current DOM.
                * Is only allowed to be called from the framework itself!
                */
                __detach() {
                    super.__detach();
                    //this.__eButton.each((index, ele) => {
                    //    $("." + ele).off("click");
                    //})
                    /**
                     * Disable everything which is not needed while the control is not part of the active dom.
                     * No need to listen to events for example!
                     */
                }
                /**
                * @description Destroy the current control instance.
                * Will be called automatically if system destroys control!
                */
                destroy() {
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
                getHTML(command) {
                    var http = new XMLHttpRequest();
                    http.open(command, "http://192.168.1.99" + this.__eCommandUrl.val(), true);
                    if (command != "PUT") {
                        http.send(this.__eMessageBody.val());
                        console.log("send");
                    }
                    else {
                        var jsonbody = "{\"hue\": " + this.__uJsonVal + ", \"transitiontime\": 1}";
                        http.send(jsonbody);
                        this.__uJsonVal += 10000;
                        if (this.__uJsonVal > 60000)
                            this.__uJsonVal = 0;
                        console.log("set");
                    }
                    http.onreadystatechange = () => {
                        if (http.readyState == 4) {
                            if (http.status == 200) {
                                this.__eResponse.val("Bad JSON: " + http.responseText);
                                this.__eResponse.val(JSON.stringify(JSON.parse(http.responseText), null, '\t'));
                                console.log("written");
                            }
                            else {
                                this.__eResponse.val("Error " + http.status);
                            }
                        }
                    };
                }
            }
            Http_Request.Http_RequestControl = Http_RequestControl;
        })(Http_Request = Controls.Http_Request || (Controls.Http_Request = {}));
        Controls.registerEx('Http_RequestControl', 'TcHmi.Controls.Http_Request', Http_Request.Http_RequestControl);
    })(Controls = TcHmi.Controls || (TcHmi.Controls = {}));
})(TcHmi || (TcHmi = {}));
//# sourceMappingURL=Http_RequestControl.js.map