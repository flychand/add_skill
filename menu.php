<li class="dropdown-header"><i class="fa fa-gear"></i>CO SCHOLASTIC</li>

            <li <?php if($this->uri->segment(2)=="CoScholastic_Skill")  
          {echo 'class="active"';}else{} ?>><a href="<?php echo base_url()."index.php/master/CoScholastic_Skill"; ?>">Add/Edit Skills</a></li>