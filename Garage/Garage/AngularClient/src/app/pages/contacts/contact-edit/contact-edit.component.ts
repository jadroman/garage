import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContactPerson } from '@models/garage.model';
import { GarageService } from '@services/garage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-contact-edit',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.scss'
})
export class ContactEditComponent implements OnInit {
  loading$!: Observable<boolean>;

  constructor(private route: ActivatedRoute, private service: GarageService) {
    this.loading$ = this.service.loadingContact$;
  }

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required)
  });

  id!: string | null;
  isAddMode: boolean = true;

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    this.isAddMode = !this.id;

    if (!this.isAddMode && this.id) {
      this.service.contact$(+this.id).subscribe(c => {
        this.form.patchValue(c);
      });
    }
  }

}
