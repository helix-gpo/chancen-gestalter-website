import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-icon',
  imports: [MatIconModule, NgStyle],
  templateUrl: './icon.html',
  styleUrl: './icon.css',
})
export class Icon {
  @Input() iconName!: string;
  @Input() iconSize!: string;
  @Input() iconColor!: string;
}
