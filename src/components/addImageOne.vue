<template>
   <div class="photo">
      <div class="input-wrapper">
      <div class="img-wrapper">
         <img class="img" :src="imagePreview" v-show="showPreview" />
      </div>
      <div class="buttons">
         <button class="add-photo">
            Добавить
            <input
               class="input"
               type="file"
               id="file"
               ref="file"
               accept="image/*"
               @change="saved"
            />
         </button>
         <button @click="removePhoto">Удалить</button>
      </div>
      </div>
   </div>
</template>

<script>
import DB from '../../firebase/index'

export default {
   name:'ImgOne',
   props:  ['imagePreview','showPreview','file','download','storageLink','databaselink','save'],
   methods:{
      handleFileUpload() {
         let file = this.$refs.file.files[0];
         this.$emit('changeFile',file)
         let reader = new FileReader();
         reader.addEventListener(
         "load",
         async () => {
            this.$emit('changeShowPreview',true)
            let imagePreview = reader.result;
            this.$emit('changeimagePreview',imagePreview)
            try {
               const url = await DB.sendImg(this.storageLink, file);
               await DB.sendData(this.databaselink, { url });
               console.log('65464');
            } catch (error) {
               console.log(error);
            }
         },
         false
         );
         if (file) {
            if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
               reader.readAsDataURL(file);
            }
         }
      },
      handleFileUploadNO(){
         let file = this.$refs.file.files[0];
         this.$emit('changeFile',file)
         let reader = new FileReader();
         reader.addEventListener(
         "load",
         () => {
            this.$emit('changeShowPreview',true)
            let imagePreview = reader.result;
            this.$emit('changeimagePreview',imagePreview)
         },
         false
         );
         if (file) {
            if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
               reader.readAsDataURL(file);
            }
         }
      },
      async removePhoto() {
         this.$emit('changeFile',"");
         this.$emit('changeShowPreview',false)
         this.$emit('changeimagePreview',"")
         if(this.save){
            await DB.deleteStorageItem(this.storageLink);
            await DB.removeData(this.databaselink);
            console.log('644');
         }
      },
      async getContent() {
         let imagePreview;
         
         if(this.save){
            imagePreview = (await DB.getData(this.databaselink))?.url;
         }else imagePreview = await DB.getData(this.databaselink);
         
         this.$emit('changeimagePreview', imagePreview);
         let showPreview = !imagePreview ? false:true;
         this.$emit('changeShowPreview', showPreview);
    },
   },
   mounted() {
      this.getContent();
   },
   computed:{
      saved(){
         if(this.save){
            return this.handleFileUpload
         } else return this.handleFileUploadNO
      }
   }
}
</script>


<style scoped>
.input {
  font-size: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 100;
}
.img-wrapper {
  width: 170px;
  height: 100px;
  border: 2px solid #000;
  background: #e6e6e6 url("../assets/add-img.jpg") no-repeat 50% 50%/ 30% auto;
  position: relative;
}
.img {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
}
.add-photo {
  position: relative;
  margin-right: 50px;
  margin-left: 50px;
}
button {
  border: 1px solid #000;
  border-radius: 5px;
  width: 150px;
  height: 40px;
}
.input-wrapper {
  display: flex;
}
</style>