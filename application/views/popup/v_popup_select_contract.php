<?php include 'v_popup_header.php';?>
      <!-- general form elements -->
      <input type="hidden" id="braId" name="braId" value="<?php if(isset($_GET["id"])){ echo $_GET["id"]; }?>"/>
      <input type="hidden" id="frmAct" name="frmAct" value="<?php if(isset($_GET["action"])){ echo $_GET["action"]; }?>"/>
      <input type="hidden" id="parentId" name="parentId" value="<?php if(isset($_GET["parentId"])){ echo $_GET["parentId"]; }?>"/>
      <!-- form start -->
          <div role="form" class="form-horizontal" id="frmStaff" action="" style="display: none">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btnExit">
              <span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="popupTitle"><i class="fa fa-handshake-o"></i> <span data-i18ncd="lb_select_contract">Select Contract</span></h4>
          </div>
          
          <div class="modal-body" id="modalMdBody">
              <!-- modal body  -->
              <div class="row">
            <!-- button -->
            <div class="row">
              <div class="col-xs-12">
                <div class="col-xs-12" style="display: inline-table;">
                  <div class="pull-right">
                        <div class="input-group input-group-sm">
                            <input type="text" class="form-control" id="txtSearch" value="<?php if(isset($_GET["dataSrch"])){ echo $_GET["dataSrch"]; }?>">
                            <span class="input-group-btn">
                              <button id="btnSearch" type="button" class="btn btn-default btn-flat"><i class="fa fa-search" aria-hidden="true"></i></button>
                            </span>
                         </div>
                    </div>
                </div>
                </div>
            </div>
            <!-- /.button -->
            <br>
            <div class="box-body table-responsive fix-header-tbl" style="height: 235px;padding-top: 0;">
              <table class="table table-hover" id="tblContract" >
                <thead>  
                  <tr>
                    <th class="top-zero"><input type="checkbox" id="chkAllContract"></th>
                    <th class="top-zero" data-i18ncd="" class="top-zero">Contract Code</th>
                    <th class="top-zero" data-i18ncd="">Contract Start</th>
                    <th class="top-zero" data-i18ncd="">Loan Amount</th>                    
                    <th class="top-zero" data-i18ncd="">Loan Interest</th>
                    <th class="top-zero" data-i18ncd="">Customer</th>
                  </tr>
              </thead>
              <tbody>
                 
              </tbody>
              
              </table>
            </div>
            <!-- /.box-body -->
              </div>
                <!-- end modal body  -->
          </div>
     
          <div class="modal-footer" style="padding-bottom: 0;">
            <button data-i18ncd="btn_choose" type="button" class="btn btn-primary btn-sm" id="btnChoose">Choose</button>
            <button data-i18ncd="btn_close" type="button" class="btn btn-default btn-sm" id="btnClose">Close</button>
          </div>
          </div>
          <!-- form end --> 
          <!-- end general form elements -->
<?php include 'v_popup_footer.php';?>
<script src="<?php echo base_url('assets/') ?>js/pages/popup/v_popup_select_contract.js"></script>