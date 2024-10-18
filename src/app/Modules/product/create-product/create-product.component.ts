import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CpuService } from 'src/app/Utils/Services/CPU.service';
import { CameraService } from 'src/app/Utils/Services/Camera.service';
import { CategoryService } from 'src/app/Utils/Services/Category.service';
import { ConnectivityService } from 'src/app/Utils/Services/Connectivity.service';
import { ImageService } from 'src/app/Utils/Services/Image.service';
import { ProductService } from 'src/app/Utils/Services/Product.service';
import { QuestionService } from 'src/app/Utils/Services/Question.service';
import { ScreenService } from 'src/app/Utils/Services/Screen.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent implements OnInit {
  productForm: any;
  images: any[] = [];
  imagesLinks: string[] = [];
  connectivityOptions: any[] = [];
  connectivityIds: number[] = [];
  selected: any[] = [];
  categories: any[] = [];
  questions: any[] = [];
  errMessage: string = '';
  id_product: number = 0;
  product: any;

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private cpuService: CpuService,
    private connectivityService: ConnectivityService,
    private screenService: ScreenService,
    private cameraService: CameraService,
    private categoryService: CategoryService,
    private questionService: QuestionService,
    private imageService: ImageService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getAllQuestions();
    this.getConnectivities();
    this.getCategories();
    this.id_product = Number(this.route.snapshot.paramMap.get('id'));
    this.getProductById();
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      reference: ['', Validators.required],
      color: ['', Validators.required],
      categoryId: ['', Validators.required], // Assuming this field represents the category ID
      description: [''],
      model: [''],
      speed: [''],
      corsNumber: [''],
      ram: [''],
      batteryCapacity: [''],
      operatingSystem: [''],
      size: [''],
      resolution: [''],
      type: [''],
      backResol: [''],
      frontResol: [''],
      questionId: [''],
      buyLink: ['']
      // Assuming this field represents the selected connectivity options
    });
  }

  getProductById() {
    if (this.id_product) {
      this.productService.getProductById(this.id_product).subscribe((data: any) => {
        this.product = data;
        console.log(this.product);
        this.patchValues();
      });
    }
  }

  patchValues() {
    if (this.id_product) {
      this.productForm.patchValue({
        name: this.product.name,
        price: this.product.price,
        quantity: this.product.quantity,
        reference: this.product.reference,
        color: this.product.color,
        categoryId: this.product.category.category_id, // Assuming this field represents the category ID
        description: this.product.description,
        model: this.product.cpu.model,
        speed: this.product.cpu.speed,
        corsNumber: this.product.cpu.corsNumber,
        ram: this.product.ram,
        batteryCapacity: this.product.batteryCapacity,
        operatingSystem: this.product.operatingSystem,
        size: this.product.screen.size,
        resolution: this.product.screen.resolution,
        type: this.product.screen.type,
        backResol: this.product.camera.backResol,
        frontResol: this.product.camera.frontResol,
        questionId: this.product.question.question_id,
        buyLink: this.product.buyLink
      });
      this.connectivityIds = this.product.connectivityOptions.map((con: any) => con.id);
      this.selected = this.product.connectivityOptions;
      this.imagesLinks = this.product.images.map((image: any) => image.url);
    }
  }

  getCategories() {
    this.categoryService.getParents().subscribe((data: any) => {
      this.categories = data;
    })
  }

  getAllQuestions() {
    this.questionService.getQuestionsWithNoChildren().subscribe((data: any) => {
      this.questions = data;
    })
  }

  getConnectivities() {
    this.connectivityService.getAllConnectivity().subscribe((data: any) => {
      this.connectivityOptions = data;
      console.log(this.connectivityOptions);
    });
  }

  getValues(event: any) {
    let id = event.value;
    let option = this.connectivityIds.find(x => x == id);
    if (!option) {
      this.connectivityIds.push(id);
      this.selected.push(this.connectivityOptions.find(op => op.id == id));
    }
  }

  deleteSelected(id: number) {
    for (let i = 0; i < this.selected.length; i++) {
      if (this.selected[i].id == id) {
        this.selected.splice(i, 1);
      }
    }

    for (let i = 0; i < this.connectivityIds.length; i++) {
      if (this.connectivityIds[i] == id) {
        this.connectivityIds.splice(i, 1);
      }
    }
    console.log(this.connectivityIds);
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file: File = files[i];
      if (file) {
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
          this.imagesLinks.push(e.target.result);
          this.images.push(file);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  clearImages() {
    if (!this.id_product) {
      this.images = [];
      this.imagesLinks = [];
    } else {
      this.product.images.forEach((image: any) => {
        this.imageService.deleteImage(image.image_id).subscribe();
      })
      this.images = [];
      this.imagesLinks = [];
    }
  }

  saveImages(id: number) {
    this.imageService.addImages(this.images, id).subscribe((data: any) => {
      window.location.replace("/product/product-details/" + id);
    })
  }

  createProduct() {
    if (this.images.length == 0) {
      this.errMessage = "You need to insert at least one image";
    } else if (this.productForm.invalid) {
      this.errMessage = "Error while inserting"
    } else {
      let productRequest = {
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        quantity: this.productForm.value.quantity,
        reference: this.productForm.value.reference,
        color: this.productForm.value.color,
        categoryId: this.productForm.value.categoryId, // Assuming this field represents the category ID
        description: this.productForm.value.description,
        cpu: {
          model: this.productForm.value.model,
          speed: this.productForm.value.speed,
          corsNumber: this.productForm.value.corsNumber,
        },
        ram: this.productForm.value.ram,
        batteryCapacity: this.productForm.value.batteryCapacity,
        operatingSystem: this.productForm.value.operatingSystem,
        screen: {
          size: this.productForm.value.size,
          resolution: this.productForm.value.resolution,
          type: this.productForm.value.type,
        },
        camera: {
          backResol: this.productForm.value.backResol,
          frontResol: this.productForm.value.frontResol,
        },
        questionId: this.productForm.value.questionId, // Assuming this field represents the selected connectivity options
        connectivityIds: this.connectivityIds,
        buyLink: this.productForm.value.buyLink
      }
      console.log(productRequest)
      this.productService.saveProduct(productRequest).subscribe({
        next: (res: any) => {
          this.saveImages(res.product_id);
        },
        error: () => {
          this.errMessage = "Error while inserting!"
        }
      });
    }
  }

  updateProduct() {
    if (this.images.length == 0 && this.imagesLinks.length == 0) {
      this.errMessage = "You need to insert at least one image";
    } else if (this.productForm.invalid) {
      this.errMessage = "Error while inserting"
    } else {
      let productRequest = {
        name: this.productForm.value.name,
        price: this.productForm.value.price,
        quantity: this.productForm.value.quantity,
        reference: this.productForm.value.reference,
        color: this.productForm.value.color,
        categoryId: this.productForm.value.categoryId, // Assuming this field represents the category ID
        description: this.productForm.value.description,
        cpu: {
          model: this.productForm.value.model,
          speed: this.productForm.value.speed,
          corsNumber: this.productForm.value.corsNumber,
        },
        ram: this.productForm.value.ram,
        batteryCapacity: this.productForm.value.batteryCapacity,
        operatingSystem: this.productForm.value.operatingSystem,
        screen: {
          size: this.productForm.value.size,
          resolution: this.productForm.value.resolution,
          type: this.productForm.value.type,
        },
        camera: {
          backResol: this.productForm.value.backResol,
          frontResol: this.productForm.value.frontResol,
        },
        questionId: this.productForm.value.questionId, // Assuming this field represents the selected connectivity options
        connectivityIds: this.connectivityIds,
        buyLink: this.productForm.value.buyLink
      }
      console.log(productRequest)
      this.productService.updateProduct(productRequest, this.id_product).subscribe({
        next: (res: any) => {
          if (this.images.length > 0) {
            this.saveImages(this.id_product);
          } else {
            window.location.replace("/product/product-details/" + this.id_product);
          }
        },
        error: () => {
          this.errMessage = "Error while updating!"
        }
      });
    }
  }



}
