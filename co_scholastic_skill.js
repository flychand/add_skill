      
   $(document).ready(function(){
       
      var url = base_url+"index.php/master/CoScholastic_Skill/exams";
      var urlpost = base_url+"index.php/master/CoScholastic_Skill/exam";
      var urlDelete = base_url+"index.php/master/CoScholastic_Skill/exam/id/";
      var urlDelete1 = base_url+"index.php/master/CoScholastic_Skill/examm/id/";

      var title= "Exam";   
      
      
              $("#datatable").on('click', 'tr td span a', function() {
            
               var name = $('td', this).eq(0).text();
               var oTable;
               if ( $.fn.dataTable.isDataTable( '#datatable' ) ) {

                  oTable   = $('#datatable').dataTable();
               }

               var rowindex = oTable.fnGetPosition( $(this).closest('tr')[0] );
               var aPos     = oTable.fnGetPosition(this);
               var aData    = oTable.fnGetData(rowindex);
               //$('#form').loadJSON(aData);
               $('#caption').html("Edit Skill");
               $('#skill_id').val(aData.skill_id);
               $('#skill_name').val(aData.skill_name);
               //alert(aData.skill_name);

            });
      load_table(sln=1);
            $('#datatable').on('click', 'tr td strong a', function () {
               var oTable;
               if ( $.fn.dataTable.isDataTable( '#datatable' ) ) {
                  oTable   = $('#datatable').dataTable();
   
               }
               var rowindex = oTable.fnGetPosition( $(this).closest('tr')[0] );
               var aPos     = oTable.fnGetPosition(this);
               var aData    = oTable.fnGetData(rowindex);
              
            $("#custom-error").html(delcmsg);
            $("#mod-error").modal("show");  
            $( ".btn-danger" ).click(function(){  
                      var data = $.ajax({
                        url: urlDelete1+aData.skill_id, 
                        type:"delete",
                        success:function (html){ 
                           $("#datatable").dataTable().fnDestroy();
                           load_table(sln=1); 
                           pop_me(title,delete_msg, success);
                        } 
                     });
                      //console.log(data); 
                });

         });      
       /* Formating function for row details */
        function fnFormatDetails ( oTable, nTr, action ){
            var aData = oTable.fnGetData( nTr );
           if(action ==='edit'){
              // $('#sectionName').val(aData.sectionName );
               $('#skillform').loadJSON(aData);
               $('#caption').html("Edit Skill");
               $('save').val('Update');
               $('#add').click(); 
               
          }
           if(action ==='delete')
           { 
                $("#custom-error").html(delcmsg);
                $("#mod-error").modal("show");  
                $( ".btn-danger" ).click(function(){                              
                   var data = $.ajax({
                     url: urlDelete+aData.skill_id, 
                     type:"delete",
                      success:function (html)
                      { 
                        $("#datatable").dataTable().fnDestroy();
                        load_table(sln=1); 
                        pop_me(title,delete_msg, success);
                     } 
                  });
                });
            }
        }
       
        /*
         * Insert a 'details' column to the table
         */
        var nCloneTh = document.createElement( 'th' );
        var nCloneTd = document.createElement( 'td' );
       
        $('.dataTables_filter input').addClass('form-control').attr('placeholder','Search');
        $('.dataTables_length select').addClass('form-control');

    function load_table(sln)
      {
   
          $('#caption').html("Add New Skill");
          var data = $.parseJSON(
          call_ajax(url, false, "json", "", "get").responseText
        ); 
        data = data;
        config={ 
         
        "aaData":data,
        "bPaginate":true,
        'iDisplayLength': 100,
          'language': {
          'search': '_INPUT_',
          'searchPlaceholder': 'Search'
          },
      "aoColumns": [   
          { "mData": null ,"sTitle":"S.No.","sWidth": "10%","sDefaultContent":0,"mRender": function (data,type){     
          return (type=="display")? sln++:0; 
          }},
          { "mData": "skill_id" ,"sTitle":"Number"},
          { "mData": "skill_name" ,"sTitle":"Skill Name"},
          {"mData": null,"sTitle":"Edit / Delete","sDefaultContent": "<td><span><a class='btn btn-primary btn-xs md-trigger' data-toggle='modal'><i class='fa fa-pencil'></i></a></span><strong><a class='btn btn-danger btn-xs' href='#' data-original-title='Remove' data-toggle='tooltip'><i class='fa fa-times'></i></a></strong></td>","sWidth": "15%","bSortable": false} 
     
    ],
    "fnDrawCallback": function () { }
   };
       
      $('#datatable').dataTable(  config  ); 
   }  
   var frm = $("#skillform");
   var JSONdataclear = JSON_Array(frm); // JSON_Array from util.js
    
   $("#save").click(function(){ 
       if ( !$('#skillform').parsley().validate()) {
               event.preventDefault(); 
               return false; 
               }       

       var frm = $("#skillform"); 
       var serialized = frm.serializeArray(); 
       var JSONdata = JSON_Array(frm);     
       var data = {data:JSONdata} ; 
       //console.log(data);
       var request = call_ajax(urlpost, false, "json", data, "post"); 
            if(request.statusText=="OK"){  
               $("#datatable").dataTable().fnDestroy(); 
                pop_me(title,save_msg, success); 

                $('#skillform')[0].reset();
            }else{
                  console.log(request);
               }
               load_table(sln=1);  
         $("#skill_id").val("");
         $("#skill_name").val(""); 
      }); 

         $("#cancel").click(function(){
         $("#skill_id").val("");
         $("#skill_name").val("");

    });
});
