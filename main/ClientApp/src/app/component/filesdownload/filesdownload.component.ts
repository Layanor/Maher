import { FileDetails } from './../../classes/FileDetails';
import { Component, Input, OnInit } from '@angular/core';
import { FileService } from '../../../app/service/file.service';

@Component({
  selector: 'app-filesdownload',
  templateUrl: './filesdownload.component.html',
  styleUrls: ['./filesdownload.component.css'],
})
export class FilesdownloadComponent implements OnInit {
  constructor(public fileser: FileService) {}
  @Input() files: FileDetails[];
  ngOnInit(): void {}
  download(ff: any) {
    const fileurl =
      '/api/Files/download/' + ff.Id + ff.Extension + '/' + ff.FileName;
    // console.log(fileurl);
    this.fileser.download(fileurl).subscribe((blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = ff.FileName + '.' + ff.Extension;
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
    // href="/Call37s/Download/?p={{ f.Id }} + {{  f.Extension}}&d={{ f.FileName }}"
  }
}
