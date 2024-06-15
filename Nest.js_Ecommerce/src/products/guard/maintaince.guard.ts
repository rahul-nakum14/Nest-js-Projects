// maintenance.guard.ts
import { Injectable, CanActivate } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MaintenanceGuard implements CanActivate {
  private maintenanceMode: boolean = false;

  // Method to toggle maintenance mode
  toggleMaintenanceMode(status: boolean) {
    this.maintenanceMode = status;
  }

  canActivate(): boolean | Promise<boolean> | Observable<boolean> {
    return !this.maintenanceMode;
  }
}
