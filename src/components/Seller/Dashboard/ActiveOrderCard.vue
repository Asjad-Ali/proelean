<template>
<div class="app-card app-card-orders-table shadow-sm my-3" >
   <div class="app-card-body" >
      <div class="table-responsive">
         <table class="table app-table-hover mb-0 p-1 text-left" >
            <thead >
               <tr >
                  <th class="cell bold text-center" >Service</th>
                  <th class="cell bold" >Title</th>
                  <th class="cell bold" >Price</th>
                  <th class="cell bold text-center" >Due In</th>
                   
                  <th class="cell bold text-center" >Status</th>
                  <th class="cell bold" ></th>
               </tr>
            </thead>
            <tbody >
               <tr >
                  <td class="text-center cell" >
                     <div >
                       <img class="img-fluid bg-info mb-1" src="https://api.dex.proelean.com/uploads/SellerMedia/123416456141564.jpg" alt="img" width="80" height="80"></div>
                      
                  </td>
                  <td class="cell" ><span class="truncate" >Get work done faster and with confidence on Pro eLean. Get work done faster and with confidence on Pro eLean. Get work done faster and with confidence on Pro eLean. </span></td>
                  <td class="cell" ><span class="truncate" >€ 450</span></td>
                  <td class="text-center cell" ><span class="truncate mdi mdi-clock" > 9d, 10h</span></td>
                   
                  <td class="text-center cell" >
                    
                  <span class="badge bg-success" >IN PROGRESS</span> 
                    
                  </td>
                  <td class="cell" >
                     <a href="/dashboard/order-details/a2JxdnVRYUoreCs5QUVpeTJBT0xHdz09" class="btn btn-light" > View </a>
                  </td>
               </tr>
            </tbody>
         </table>
      </div>
      <!--//table-responsive-->
   </div>
   <!--//app-card-body-->
</div>
</template>

<script>
export default {};
</script>

<style scoped>
 
 .bold{
  font-weight: 500 !important;
}

.name-holder{
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  /* background-color: #E4E5E5; */
  background: rgba(0, 0, 0, 0.562);
  padding: 10px;
  color:#fff;
  border-radius: 50%;
  font-weight: 600;
}
.online-icon{
  position: absolute;
  height: 10px;
  width: 10px;
  border-radius: 50%;
 background: #75a925;
  bottom: 2px;
  right: 2px;
}

</style>