import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { NavBrowserComponent } from './components/nav-browser/nav-browser.component';
import { NavMobileComponent } from './components/nav-mobile/nav-mobile.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { SplashComponent } from './pages/splash/splash.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { DeckComponent } from './pages/deck/deck.component';
import { FlashcardComponent } from './pages/flashcard/flashcard.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { AddCardComponent } from './pages/add-card/add-card.component';
import { ForumsComponent } from './pages/forums/forums.component';
import { ImageCaptureComponent } from './pages/image-capture/image-capture.component';
import { NoPictureComponent } from './pages/no-picture-card/no-picture-card.component';
import { ConfirmCompletedCardComponent } from './pages/confirm-completed-card/confirm-completed-card.component';
import { UserSettingsComponent } from './pages/user-settings/user-settings.component';
import { EditCardComponent } from './pages/edit-card/edit-card.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConversationsComponent } from './pages/conversations/conversations.component';
import { ForumTopicComponent } from './pages/forum-topic/forum-topic.component';
import { ForumPostComponent } from './pages/forum-post/forum-post.component';
import { NewForumPostComponent } from './pages/new-forum-post/new-forum-post.component';
import { AddCardNoImageComponent } from './pages/add-card-no-image/add-card-no-image.component';
import { DeckDetailComponent } from './pages/deck-detail/deck-detail.component';
import { TestComponent } from './pages/test/test.component';
import { AddCardUploadComponent } from './pages/add-card-upload/add-card-upload.component';
import { ProfileNavMobileComponent } from './components/profile-nav-mobile/profile-nav-mobile.component';
import { CardComponent } from './pages/card/card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { InvitesComponent } from './pages/invites/invites.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { AboutComponent } from './pages/about/about.component';
import { GoogleComponent } from './pages/google/google.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { GradeComponent } from './pages/grade/grade.component';

const CONFIG_URL = environment.url;

const config: SocketIoConfig = { url: CONFIG_URL, options: { transports: ['websocket']} };

@NgModule({
  declarations: [
    AppComponent,
    NavBrowserComponent,
    NavMobileComponent,
    HeaderComponent,
    HomeComponent,
    SplashComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ContactsComponent,
    DeckComponent,
    FlashcardComponent,
    MessagesComponent,
    AddCardComponent,
    ForumsComponent,
    ImageCaptureComponent,
    NoPictureComponent,
    ConfirmCompletedCardComponent,
    UserSettingsComponent,
    EditCardComponent,
    FooterComponent,
    ConversationsComponent,
    ForumTopicComponent,
    ForumPostComponent,
    NewForumPostComponent,
    AddCardNoImageComponent,
    TestComponent,
    DeckDetailComponent,
    AddCardUploadComponent,
    ProfileNavMobileComponent,
    CardComponent,
    SearchBarComponent,
    InvitesComponent,
    SearchResultsComponent,
    AboutComponent,
    AdminLoginComponent,
    GoogleComponent,
    GradeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    SocketIoModule.forRoot(config),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
