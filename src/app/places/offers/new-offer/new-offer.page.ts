import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { AuthService } from 'src/app/auth/auth.service';
import { PlacesService } from '../../places.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PlaceLocation } from '../../location.model';
import { switchMap } from 'rxjs/operators';

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss'],
})



export class NewOfferPage implements OnInit {
  form: FormGroup;


  constructor(private authService: AuthService, private placeService: PlacesService, private router: Router, private loadingCntrl: LoadingController) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      fromDate: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      toDate: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      location: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null)

    })
  }
  onLocationPicked(location: PlaceLocation) {
    this.form.patchValue({ location: location });
  }
  onImagePicked(imageData:String | File){
    let imageFile;
    if (typeof imageData === 'string') {
      try {
        imageFile = base64toBlob(
          imageData.replace('data:image/jpeg;base64,', ''),
          'image/jpeg'
        );
      } catch (error) {
        console.log(error);
        return;
      }
    } else {
      imageFile = imageData;
    }
    this.form.patchValue({ image: imageFile });
  }

  onCreateOffer() {
    console.log(this.form);
    if (!this.form.valid) {
      return;
    }
    this.loadingCntrl.create({
      message: 'Creating place'
    }).then(loadingEl => {
      loadingEl.present();
      this.placeService.uploadImage(this.form.get('image').value).pipe(
        switchMap(uploadResp=>{
          console.log(uploadResp);
          return  this.placeService.addPlace(this.form.value.title,
          this.form.value.description,uploadResp.imageUrl, this.form.value.price, this.form.value.fromDate,
          this.form.value.toDate,this.form.value.location)
        })
      ).subscribe(() => {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigateByUrl('/places/tabs/offers');
        });
    })
  }
}
