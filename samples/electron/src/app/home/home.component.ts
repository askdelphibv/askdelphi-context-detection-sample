import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from '../core/services';
import { AuthorizationService } from '../core/services/authorization-service/authorization.service';
import { ContentTaggingService } from '../core/services/content-tagging-service/content-tagging.service';
import { Rule } from '../core/models/rule';
import { Tag } from '../core/models/tag';
import { TaggedContent } from '../core/models/taggedContent';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  webview: any = document.querySelector('webview');
  token: any;
  refreshToken: any;
  publicationGuid: string;
  context: string;

  constructor(private router: Router,
              private authorizationService: AuthorizationService,
              private contentTaggingService: ContentTaggingService,
              private electronService: ElectronService) {
                electronService.ipcRenderer.on('receivedToken', (event, args) => {
                  setTimeout(() => {
                    this.token = args.token;
                    this.refreshToken = args.refreshToken;
                  });
                });
              }

  ngOnInit(): void {
  }

  logingThroughTokenAPI() {
    this.authorizationService.getTokenUrl(this.publicationGuid).subscribe(
      t => {
        this.electronService.ipcRenderer.send('openLoginWindow', { url: t });
      });
  }

  getTaggedContent() {
    const rule: Rule = {
      contextXML: this.context,
      publicationGuid: this.publicationGuid
    };

    this.contentTaggingService.postRule(rule, this.token).subscribe(
      t => {
        if(t.totalcount >= 1) {
          for (let i = 0; i < t.totalcount; i++) {
            const tag: Tag = {
              tag: t.matchingRules[i].tag,
              publicationGuid: this.publicationGuid
            };

            this.contentTaggingService.getTopicByTag(tag, this.token).subscribe(
              y => {
                for (let x = 0; i < y.totalcount; x++) {
                  const contentTag: TaggedContent = {
                    tag: y.results[x].title,
                    url: y.results[x].url
                  };
                  console.log(contentTag);
                }
              }
            );
          }
        }
      }
    );
  }
}
