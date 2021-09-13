#include<stdio.h>
main(){
   long long int t,a,b,c;
   long long  int n;
    scanf("%ld",&t);
    while(t--)
    {
        scanf("%I64d",&a);
        scanf("%I64d",&b);
        scanf("%I64d",&c);
        n=a+b+c;
        if(n%2==0){
            printf("%I64d\n",n/2);
            
        }else{
            n=n-1;
            printf("%I64d\n",n/2);
        }
    }
    
    
    
    return 0;
}
