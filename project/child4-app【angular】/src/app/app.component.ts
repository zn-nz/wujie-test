import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { bus, props } from 'src/wujie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Tour of Heroes';
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        bus?.$emit(props.routeEventName, bus.id, event.url);
      }
    });
  }
  ngAfterViewInit() {
    bus?.$emit('log', `%c${bus.id}开始监听路由`);
    // 接收基座子应用初始路由
    bus?.$on(`${bus.id}-router-change`, (path: string) => {
      bus?.$emit('log', `%c${bus.id}切换路由%c${path}`);
      this.router.navigateByUrl(path);
    });
  }
}
