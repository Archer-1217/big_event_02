$(function () {
    let form = layui.form;

    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
                return '原密码和旧密码不能相同';
            }
        },

        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次密码输入不一致';
            }
        },

    })



    $('.layui-form').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    // console.log(res);
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg('修改密码成功！');

                $('.layui-form')[0].reset();
            }
        })
    })
})