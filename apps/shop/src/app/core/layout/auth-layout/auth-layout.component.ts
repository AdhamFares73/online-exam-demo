import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FolderCodeComponent } from '../../../shared/icons/folder-code/folder-code.component';
import { BrainComponent } from '../../../shared/icons/brain/brain.component';
import { BookOpenCheckComponent } from '../../../shared/icons/book-open-check/book-open-check.component';
import { RectangleEllipsisComponent } from '../../../shared/icons/rectangle-ellipsis/rectangle-ellipsis.component';
@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css'],
  imports: [
    RouterOutlet,
    FolderCodeComponent,
    BrainComponent,
    BookOpenCheckComponent,
    RectangleEllipsisComponent,
  ],
})
export class AuthLayoutComponent {}
