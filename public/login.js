  document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const login = document.getElementById('login').value;
    const password = document.getElementById('password').value;
    const uid = document.getElementById('uid').value;
        try {
            const response = await fetch('/interaction/'+uid+'/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ login, password })
            });
      
            const result = await response.json();
      
            if(result.error){
              // Handle errors
              const errorMessage = document.getElementById('error-message');
              errorMessage.classList.remove('hidden');
      
              if (result.error === 'LoginError') {
                errorMessage.textContent = '无效的账号或密码，请重试。';
              } else if (result.error === 'SessionNotFound') {
                errorMessage.textContent = '登录失败，请稍后再试。';
              } else {
                errorMessage.textContent = '登录失败，请稍后再试。';
              }
            }else if(result.redirectTo){
                window.location.href = result.redirectTo;
            }
          } catch (error) {
            // Handle network or other errors
            const errorMessage = document.getElementById('error-message');
            errorMessage.classList.remove('hidden');
            errorMessage.textContent = '登录失败，请检查您的网络连接。';
          }
  });