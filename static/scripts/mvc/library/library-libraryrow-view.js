"use strict";define(["layout/masthead","utils/utils","libs/toastr"],function(t,e,i){return{LibraryRowView:Backbone.View.extend({events:{"click .edit_library_btn":"edit_button_clicked","click .cancel_library_btn":"cancel_library_modification","click .save_library_btn":"save_library_modification","click .delete_library_btn":"delete_library","click .undelete_library_btn":"undelete_library"},edit_mode:!1,element_visibility_config:{upload_library_btn:!1,edit_library_btn:!1,permission_library_btn:!1,save_library_btn:!1,cancel_library_btn:!1,delete_library_btn:!1,undelete_library_btn:!1},initialize:function(t){this.render(t)},render:function(t){void 0===t&&(t=Galaxy.libraries.libraryListView.collection.get(this.$el.data("id"))),this.prepareButtons(t);var e=this.templateRow();return this.setElement(e({library:t,button_config:this.element_visibility_config,edit_mode:this.edit_mode})),this.$el.show(),this},repaint:function(t){$(".tooltip").hide();var e=this.$el;this.render(),e.replaceWith(this.$el),this.$el.find("[data-toggle]").tooltip()},prepareButtons:function(t){var e=this.element_visibility_config;!1===this.edit_mode?(e.save_library_btn=!1,e.cancel_library_btn=!1,e.delete_library_btn=!1,!0===t.get("deleted")?(e.undelete_library_btn=!0,e.upload_library_btn=!1,e.edit_library_btn=!1,e.permission_library_btn=!1):!1===t.get("deleted")&&(e.save_library_btn=!1,e.cancel_library_btn=!1,e.undelete_library_btn=!1,!0===t.get("can_user_add")&&(e.upload_library_btn=!0),!0===t.get("can_user_modify")&&(e.edit_library_btn=!0),!0===t.get("can_user_manage")&&(e.permission_library_btn=!0))):!0===this.edit_mode&&(e.upload_library_btn=!1,e.edit_library_btn=!1,e.permission_library_btn=!1,e.save_library_btn=!0,e.cancel_library_btn=!0,e.delete_library_btn=!0,e.undelete_library_btn=!1),this.element_visibility_config=e},edit_button_clicked:function(){this.edit_mode=!0,this.repaint()},cancel_library_modification:function(){this.edit_mode=!1,this.repaint()},save_library_modification:function(){var t=Galaxy.libraries.libraryListView.collection.get(this.$el.data("id")),e=!1,r=this.$el.find(".input_library_name").val();if(void 0!==r&&r!==t.get("name")){if(!(r.length>2))return void i.warning("Library name has to be at least 3 characters long.");t.set("name",r),e=!0}var a=this.$el.find(".input_library_description").val();void 0!==a&&a!==t.get("description")&&(t.set("description",a),e=!0);var l=this.$el.find(".input_library_synopsis").val();if(void 0!==l&&l!==t.get("synopsis")&&(t.set("synopsis",l),e=!0),e){var n=this;t.save(null,{patch:!0,success:function(t){n.edit_mode=!1,n.repaint(t),i.success("Changes to library saved.")},error:function(t,e){void 0!==e.responseJSON?i.error(e.responseJSON.err_msg):i.error("An error occured while attempting to update the library.")}})}else this.edit_mode=!1,this.repaint(t),i.info("Nothing has changed.")},delete_library:function(){var t=this;Galaxy.libraries.libraryListView.collection.get(this.$el.data("id")).destroy({success:function(e){e.set("deleted",!0),Galaxy.libraries.libraryListView.collection.add(e),t.edit_mode=!1,!1===Galaxy.libraries.preferences.get("with_deleted")?($(".tooltip").hide(),t.repaint(e),t.$el.remove()):!0===Galaxy.libraries.preferences.get("with_deleted")&&t.repaint(e),i.success("Library has been marked deleted.")},error:function(t,e){void 0!==e.responseJSON?i.error(e.responseJSON.err_msg):i.error("An error occured during deleting the library.")}})},undelete_library:function(){var t=Galaxy.libraries.libraryListView.collection.get(this.$el.data("id")),e=this;t.url=t.urlRoot+t.id+"?undelete=true",t.destroy({success:function(t){t.set("deleted",!1),Galaxy.libraries.libraryListView.collection.add(t),e.edit_mode=!1,e.repaint(t),i.success("Library has been undeleted.")},error:function(t,e){void 0!==e.responseJSON?i.error(e.responseJSON.err_msg):i.error("An error occured while undeleting the library.")}})},templateRow:function(){return _.template(['<tr class="<% if(library.get("deleted") === true) { print("active") } %>" style="display:none;" data-id="<%- library.get("id") %>">',"<% if(!edit_mode) { %>",'<% if(library.get("deleted")) { %>','<td style="color:grey;"><%- library.get("name") %></td>',"<% } else { %>",'<td><a href="#folders/<%- library.get("root_folder_id") %>"><%- library.get("name") %></a></td>',"<% } %>",'<% if(library.get("description")) { %>','<% if( (library.get("description")).length> 80 ) { %>','<td data-toggle="tooltip" data-placement="bottom" title="<%= _.escape(library.get("description")) %>"><%= _.escape(library.get("description")).substring(0, 80) + "..." %></td>',"<% } else { %>",'<td><%= _.escape(library.get("description"))%></td>',"<% } %>","<% } else { %>","<td></td>","<% } %>",'<% if(library.get("synopsis")) { %>','<% if( (library.get("synopsis")).length> 120 ) { %>','<td data-toggle="tooltip" data-placement="bottom" title="<%= _.escape(library.get("synopsis")) %>"><%= _.escape(library.get("synopsis")).substring(0, 120) + "..." %></td>',"<% } else { %>",'<td><%= _.escape(library.get("synopsis"))%></td>',"<% } %>","<% } else { %>","<td></td>","<% } %>","<% } else if(edit_mode){ %>",'<td><textarea rows="4" class="form-control input_library_name" placeholder="name" ><%- library.get("name") %></textarea></td>','<td><textarea rows="4" class="form-control input_library_description" placeholder="description" ><%- library.get("description") %></textarea></td>','<td><textarea rows="4" class="form-control input_library_synopsis" placeholder="synopsis" ><%- library.get("synopsis") %></textarea></td>',"<% } %>",'<td class="right-center">','<% if( (library.get("public")) && (library.get("deleted") === false) ) { %>','<span data-toggle="tooltip" data-placement="top" title="Unrestricted library" style="color:grey;" class="fa fa-globe fa-lg"> </span>',"<% }%>",'<button data-toggle="tooltip" data-placement="top" title="Modify \'<%- library.get("name") %>\'" class="primary-button btn-xs edit_library_btn" type="button" style="<% if(button_config.edit_library_btn === false) { print("display:none;") } %>"><span class="fa fa-pencil"></span> Edit</button>','<a href="#library/<%- library.get("id") %>/permissions"><button data-toggle="tooltip" data-placement="top" title="Permissions of \'<%- library.get("name") %>\'" class="primary-button btn-xs permission_library_btn" type="button" style="<% if(button_config.permission_library_btn === false) { print("display:none;") } %>"><span class="fa fa-group"></span> Manage</button></a>','<button data-toggle="tooltip" data-placement="top" title="Save changes" class="primary-button btn-xs save_library_btn" type="button" style="<% if(button_config.save_library_btn === false) { print("display:none;") } %>"><span class="fa fa-floppy-o"></span> Save</button>','<button data-toggle="tooltip" data-placement="top" title="Discard changes" class="primary-button btn-xs cancel_library_btn" type="button" style="<% if(button_config.cancel_library_btn === false) { print("display:none;") } %>"><span class="fa fa-times"></span> Cancel</button>','<button data-toggle="tooltip" data-placement="top" title="Delete \'<%- library.get("name") %>\'" class="primary-button btn-xs delete_library_btn" type="button" style="<% if(button_config.delete_library_btn === false) { print("display:none;") } %>"><span class="fa fa-trash-o"></span> Delete</button>','<span data-toggle="tooltip" data-placement="top" title="Marked deleted" style="color:grey; <% if(button_config.undelete_library_btn === false) { print("display:none;") } %>" class="fa fa-ban fa-lg"></span>','<button data-toggle="tooltip" data-placement="top" title="Undelete \'<%- library.get("name") %>\' " class="primary-button btn-xs undelete_library_btn" type="button" style="<% if(button_config.undelete_library_btn === false) { print("display:none;") } %>"><span class="fa fa-unlock"></span> Undelete</button>',"</td>","</tr>"].join(""))}})}});
//# sourceMappingURL=../../../maps/mvc/library/library-libraryrow-view.js.map
