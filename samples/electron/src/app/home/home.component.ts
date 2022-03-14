import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from '../core/services';
import { AuthorizationService } from '../core/services/authorization-service/authorization.service';
import { ContentTaggingService } from '../core/services/content-tagging-service/content-tagging.service';
import { GetContextTagsRequest } from '../core/models/get-context-tags-request';
import { SearchByTagRequest } from '../core/models/search-by-tag-request';
import { GetContextTagsResponse, MatchingRule } from '../core/models/get-context-tags-response';
import { SearchByTagsResponseEntry } from '../core/models/search-by-tag-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  webview: any = document.querySelector('webview');
  public token: string;
  public refreshToken: string;
  public publicationGuid: string = '9107873b-241c-44f4-b866-dc2c413e31ce';
  public context: string = '<context> <BasicWindowProperties window-class="OpusApp"></BasicWindowProperties> <WordRibbon> <Tab name="Home" active="true"></Tab> </WordRibbon> </context>';
  public busy = false;
  public loggedIn = false;
  public tags: MatchingRule[] = [];
  public matches: SearchByTagsResponseEntry[];

  constructor(private router: Router,
    private authorizationService: AuthorizationService,
    private contentTaggingService: ContentTaggingService,
    private electronService: ElectronService,
    private zone: NgZone) {
  }

  ngOnInit(): void {
    this.electronService.ipcRenderer.on('receivedToken', (event, args) => {
      this.zone.run(() => {
        this.token = args.token;
        this.refreshToken = args.refreshToken;
        this.loggedIn = (this.token && this.refreshToken) ? true : false;
      });
    });
  }

  logingThroughTokenAPI() {
    this.busy = true;
    this.authorizationService.getTokenUrl(this.publicationGuid).subscribe({
      next: t => {
        this.busy = false;
        this.electronService.ipcRenderer.send('openLoginWindow', { url: t });
      },
      error: (err) => {
        console.error(err);
        this.busy = false;
      }
    });
  }

  getTags() {
    const rule: GetContextTagsRequest = {
      contextXML: this.context,
      publicationGuid: this.publicationGuid
    };

    this.tags = [];
    this.matches = [];
    this.busy = true;
    this.contentTaggingService.postGetContextTags(rule, this.token).subscribe({
      next: (t: GetContextTagsResponse) => {
        this.tags = t.matchingRules || [];
        this.busy = false;
      },
      error: (err) => {
        console.error(err);
        this.busy = false;
      }
    });
  }

  getContent(tag: MatchingRule) {
    this.matches = [];
    this.busy = true;

    const request: SearchByTagRequest = {
      publicationGuid: tag.publicationGuid,
      tag: tag.tag
    };

    this.contentTaggingService.searchByTag(request, this.token).subscribe({
      next: result => {
        this.matches = result.results;
        this.busy = false;
      },
      error: err => {
        console.error(err);
        this.busy = false;
      }
    });
  }

}
