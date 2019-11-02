import { trigger, state, animate, transition, style, query, stagger, keyframes, group } from '@angular/animations';

export const Animations = [
    trigger('move-image', [
        transition('* => right', [
            style({ transform: 'translateX(100%)' }),
            query('.boton-leer-mas', style({ transform: 'scale(0.2)', opacity: 0, background: '#fff' })),
            query('.txt-leer-mas', style({opacity:0})),
            query('.linea-inferior', style({right:'100%'})),
            query('.data-image', style({opacity:0, transform:'translateX(20%)'})),
            group([
                animate('1000ms 500ms cubic-bezier(0.23, 1, 0.32, 1)', style('*')),
                query('.boton-leer-mas', animate('600ms 1200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)', keyframes([
                    style({ opacity: 1, transform: 'scale(1)', offset: 0.8 }),
                    style({ background: 'transparent', offset: 1 })
                ]))),
                query('.txt-leer-mas', animate('300ms 1200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',style('*'))),
                query('.linea-inferior', animate('600ms 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',style('*'))),
                query('.data-image', animate('600ms 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',style('*')))
            ])
        ]),
        transition('* => left', [
            style({ transform: 'translateX(-100%)' }),
            query('.boton-leer-mas', style({ transform: 'scale(0.2)', opacity: 0, background: '#fff' })),
            query('.txt-leer-mas', style({opacity:0})),
            query('.linea-inferior', style({left:'100%'})),
            query('.data-image', style({opacity:0, transform:'translateX(-20%)'})),
            group([
                animate('1000ms 500ms cubic-bezier(0.23, 1, 0.32, 1)', style('*')),
                query('.boton-leer-mas', animate('600ms 1200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)', keyframes([
                    style({ opacity: 1, transform: 'scale(1)', offset: 0.8 }),
                    style({ background: 'transparent', offset: 1 })
                ]))),
                query('.txt-leer-mas', animate('300ms 1200ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',style('*'))),
                query('.linea-inferior', animate('600ms 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',style('*'))),
                query('.data-image', animate('600ms 900ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',style('*')))
            ])
        ]),
        //Cuando la foto actual tiene que desaparecer
        transition('* => void', [
            style({ 'z-index': 0 }),
            animate('1500ms', keyframes([
                style({ opacity: 0.5, offset: 0.3 }),
                style({ opacity: 0, offset: 1 })
            ]))
        ])
    ]),
    trigger('anim-listado',[
        transition('*=>*',[
            query('.grilla', style({transform:'translateY(30px)', opacity:0}),{optional:true}),
            query('.grilla', stagger(20,[
                animate('300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',style('*'))
            ]),{optional:true})
        ])
    ]),
    trigger('anim-admin',[
        transition(':enter',[
            query('.options', style({height:'0px'})),
            query('.options',animate('400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',style('*')))
        ]),
        transition(':leave',[
            query('.content',animate('400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',style({opacity:0, transform:'translateY(40px)'})),{optional:true}),
            query('.options',animate('400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',style({height:'0px'})),{optional:true})
        ])
    ]),
    trigger('show-thumbs',[
        transition('void => *',[
            style({background: 'rgba(51,51,51,0)'}),
            query('.item-image', style({transform:'translateY(100%)'})),
            query('.item-image-selected', style({transform:'translateY(-100%)'})),
            animate('400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',style('*')),
            query('.item-image', stagger(40,[
                animate('800ms 100ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',style('*'))
            ]))
        ]),
        transition('* => void',[
            group([
                animate('200ms 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',style({opacity:0})),
                query('.item-image', stagger(40,[
                    animate('400ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',style({transform:'translateY(100%)'}))
                ])),
                query('.item-image-selected',animate('800ms 100ms cubic-bezier(0.25, 0.46, 0.45, 0.94)',style('*')))
            ])
          
        ])
    ]),
    trigger('ver-mas',[
        transition('void => *',[
            style({opacity: 0}),
            query('.detalle',style({opacity:0,transform:'translateY(180%)'}),{optional:true}),
            //query('.login',style({opacity:0,transform:'translateY(180%)'})),
            animate('400ms',style({opacity:1})),
            query('.detalle', stagger(50,[
                animate('600ms cubic-bezier(0.175, 0.884, 0.32, 1.275)',style('*'))
            ]))
          /*   query('.login', stagger(50,[
                animate('600ms cubic-bezier(0.175, 0.884, 0.32, 1.275)',style('*'))
            ]),{optional:true})  */ 
        ])
    ]),
]