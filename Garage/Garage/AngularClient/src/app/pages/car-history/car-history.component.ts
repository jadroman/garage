import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnInit, TemplateRef, inject } from '@angular/core';
import { GarageService } from '@services/garage.service';
import { CarAtService, CarHistory, CarStatusEnum, ContactPerson } from '@models/garage.model';
import { Observable, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { getCarStatusLabel } from '@utils/car-history.utils'
import { MarkCanceledCarStatusDirective } from 'app/directives/car-history/mark-canceled-car-status.directive';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CarStatusEditComponent } from '../car-status-edit/car-status-edit.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-car-history',
  standalone: true,
  imports: [AsyncPipe, CommonModule, MarkCanceledCarStatusDirective, CarStatusEditComponent, ReactiveFormsModule],
  templateUrl: './car-history.component.html',
  styleUrl: './car-history.component.scss'
})
export class CarHistoryComponent implements OnInit {
  private modalService = inject(NgbModal);
  carId!: string | null;
  carHistory$!: Observable<CarHistory[]>;
  loading$!: Observable<boolean>;
  contact!: ContactPerson;
  reasonToCancel!: string;
  carHistoryToDelete!: number;

  constructor(private route: ActivatedRoute, private service: GarageService) {
    this.loading$ = this.service._waitIndicator$;
  }

  reasonToCancelForm = new FormGroup({
    reasonToCancel: new FormControl('', Validators.required)
  });


  onDelete() {
    if (!this.reasonToCancelForm.valid) {
      return;
    }

    this.reasonToCancel = (this.reasonToCancelForm.value.reasonToCancel !== undefined && this.reasonToCancelForm.value.reasonToCancel !== null) ? this.reasonToCancelForm.value.reasonToCancel : "";

    this.cancelHistoryStatus(this.carHistoryToDelete)

  }

  cancel() {
    this.modalService.dismissAll();
    this.reasonToCancel = "";
  }

  ngOnInit(): void {
    this.carId = this.route.snapshot.paramMap.get("carId");

    if (this.carId) {
      this.carHistory$ = this.service.carHistory$(+this.carId);

      this.service._waitIndicator$.next(true);
      this.service.getCarAtService(+this.carId).subscribe(c => {
        this.service._waitIndicator$.next(false);
        const carAtService: CarAtService = c.body;
        this.contact = carAtService.contactPerson;
      })

    }

  }

  getCarStatusLabel(carStatus: CarStatusEnum): string {
    return getCarStatusLabel(carStatus);
  }

  cancelHistoryStatus(carHistoryId: number) {
    this.service._waitIndicator$.next(true);
    this.service.cancelHistoryStatus(carHistoryId, this.reasonToCancel).subscribe(() => {
      this.service._waitIndicator$.next(false);
      if (this.carId) {
        this.service.getCarHistory(+this.carId);
      }
      this.modalService.dismissAll();
      this.reasonToCancel = "";
    });
  }

  open(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        //this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  openReasonToCancel(content: TemplateRef<any>, carHistoryId: number) {
    this.reasonToCancelForm.reset();
    this.carHistoryToDelete = carHistoryId;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
      },
      (reason) => {
        //this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  closeModal(update: boolean) {
    this.modalService.dismissAll();

    if (update) {
      this.carId = this.route.snapshot.paramMap.get("carId");

      if (this.carId) {
        this.service.getCarHistory(+this.carId);
      }
    }
  }
}
