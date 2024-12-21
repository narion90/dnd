import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule for structural directives like *ngFor and *ngIf

interface CreatureInstance {
  name: string;
  number: number;
  attackBonus: number;
  playerAC: number;
  attackNeeded: number | null;
  creaturesThatHit: number | null;
}

@Component({
  selector: 'app-root',
  standalone: true, // Mark this component as standalone
  imports: [CommonModule, FormsModule], // Import FormsModule and CommonModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  creatureInstances: CreatureInstance[] = Array(5).fill(null).map(() => this.createDefaultInstance());

  createDefaultInstance(): CreatureInstance {
    return {
      name: '',
      number: 1,
      attackBonus: 0,
      playerAC: 10,
      attackNeeded: null,
      creaturesThatHit: null
    };
  }

  addInstance() {
    this.creatureInstances.push(this.createDefaultInstance());
  }

  calculateAttack(instance: CreatureInstance) {
    const difference = instance.playerAC - instance.attackBonus;

    if (difference <= 5) {
      instance.attackNeeded = 1;
    } else if (difference <= 12) {
      instance.attackNeeded = 2;
    } else if (difference <= 14) {
      instance.attackNeeded = 3;
    } else if (difference <= 16) {
      instance.attackNeeded = 4;
    } else if (difference <= 18) {
      instance.attackNeeded = 5;
    } else if (difference === 19) {
      instance.attackNeeded = 10;
    } else if (difference === 20) {
      instance.attackNeeded = 20;
    } else {
      instance.attackNeeded = null; // Not hittable
    }

    instance.creaturesThatHit = instance.attackNeeded
      ? Math.floor(instance.number / instance.attackNeeded)
      : 0;
  }
}
