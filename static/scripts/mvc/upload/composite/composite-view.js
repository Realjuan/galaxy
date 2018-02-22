define("mvc/upload/composite/composite-view",["exports","utils/localization","utils/utils","mvc/upload/upload-model","mvc/upload/composite/composite-row","mvc/upload/upload-extension","mvc/ui/ui-popover","mvc/ui/ui-select","mvc/ui/ui-misc"],function(t,e,o,n,s,i,l,a,c){"use strict";function u(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(t,"__esModule",{value:!0});var r=u(e),d=(u(o),u(n)),h=u(s),p=u(i),f=(u(l),u(a)),v=u(c);t.default=Backbone.View.extend({collection:new d.default.Collection,initialize:function(t){var e=this;this.app=t,this.options=t.options,this.list_extensions=t.list_extensions,this.list_genomes=t.list_genomes,this.ftp_upload_site=t.currentFtp(),this.setElement(this._template()),this.btnStart=new v.default.Button({title:(0,r.default)("Start"),onclick:function(){e._eventStart()}}),this.btnClose=new v.default.Button({title:(0,r.default)("Close"),onclick:function(){e.app.modal.hide()}}),_.each([this.btnStart,this.btnClose],function(t){e.$(".upload-buttons").prepend(t.$el)}),this.select_extension=new f.default.View({css:"upload-footer-selection",container:this.$(".upload-footer-extension"),data:_.filter(this.list_extensions,function(t){return t.composite_files}),onchange:function(t){e.collection.reset();var o=_.findWhere(e.list_extensions,{id:t});o&&o.composite_files&&_.each(o.composite_files,function(t){e.collection.add({id:e.collection.size(),file_desc:t.description||t.name})})}}),this.$(".upload-footer-extension-info").on("click",function(t){new p.default({$el:$(t.target),title:e.select_extension.text(),extension:e.select_extension.value(),list:e.list_extensions,placement:"top"})}).on("mousedown",function(t){t.preventDefault()}),this.select_genome=new f.default.View({css:"upload-footer-selection",container:this.$(".upload-footer-genome"),data:this.list_genomes,value:this.options.default_genome}),this.listenTo(this.collection,"add",function(t){e._eventAnnounce(t)}),this.listenTo(this.collection,"change add",function(){e.render()}),this.select_extension.options.onchange(this.select_extension.value()),this.render()},render:function(){var t=this.collection.first();t&&"running"==t.get("status")?(this.select_genome.disable(),this.select_extension.disable()):(this.select_genome.enable(),this.select_extension.enable()),this.collection.where({status:"ready"}).length==this.collection.length&&this.collection.length>0?(this.btnStart.enable(),this.btnStart.$el.addClass("btn-primary")):(this.btnStart.disable(),this.btnStart.$el.removeClass("btn-primary")),this.$(".upload-table")[this.collection.length>0?"show":"hide"]()},_eventAnnounce:function(t){var e=new h.default(this,{model:t});this.$(".upload-table > tbody:first").append(e.$el),this.$(".upload-table")[this.collection.length>0?"show":"hide"](),e.render()},_eventStart:function(){var t=this;this.collection.each(function(e){e.set({genome:t.select_genome.value(),extension:t.select_extension.value()})}),$.uploadpost({url:this.app.options.nginx_upload_path,data:this.app.toData(this.collection.filter()),success:function(e){t._eventSuccess(e)},error:function(e){t._eventError(e)},progress:function(e){t._eventProgress(e)}})},_eventProgress:function(t){this.collection.each(function(e){e.set("percentage",t)})},_eventSuccess:function(t){this.collection.each(function(t){t.set("status","success")}),Galaxy.currHistoryPanel.refreshContents()},_eventError:function(t){this.collection.each(function(e){e.set({status:"error",info:t})})},_template:function(){return'<div class="upload-view-composite"><div class="upload-top"><h6 class="upload-top-info"/></div><div class="upload-box"><table class="upload-table ui-table-striped" style="display: none;"><thead><tr><th/><th/><th>Description</th><th>Name</th><th>Size</th><th>Settings</th><th>Status</th></tr></thead><tbody/></table></div><div class="upload-footer"><span class="upload-footer-title">Composite Type:</span><span class="upload-footer-extension"/><span class="upload-footer-extension-info upload-icon-button fa fa-search"/> <span class="upload-footer-title">Genome/Build:</span><span class="upload-footer-genome"/></div><div class="upload-buttons"/></div>'}})});
//# sourceMappingURL=../../../../maps/mvc/upload/composite/composite-view.js.map