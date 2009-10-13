/**
 * WebGL backend for SceneJs.Material node 
 */
SceneJs.Backend.installNodeBackend(
        new (function() {

            this.canvasType = 'moz-glweb20';
            this.nodeType = 'material';

            var ctx;
            var cfg;

            this.install = function(_ctx) {
                ctx = _ctx;
                if (!ctx.lightStack) {
                    ctx.lightStack = new function() {
                        var stack = [];

                        this.pushMaterial = function(context, material) {
                            if (!ctx.getActiveProgramName()) {
                                throw 'No program active';
                            }
                            stack.push(material);
                            ctx.setVars(context, { material: material });
                        };

                        this.popMaterial = function(context) {
                            if (!ctx.getActiveProgramName()) {
                                throw 'No program active';
                            }
                            stack.pop();
                            if (stack.length > 0) {
                                ctx.setVars(context, { material:stack[stack.length - 1] });
                            } else {
                                ctx.setVars(context, { material: null }); // Script will revert to default material
                            }
                        };
                    };
                }
            };

            this.configure = function(_cfg) {
                cfg = _cfg;
            };

            this.pushMaterial = function(material) {
                ctx.pushMaterial(cfg.context, material);
            };

            this.popMaterial = function() {
                ctx.popMaterial(cfg.context);
            };
        })());